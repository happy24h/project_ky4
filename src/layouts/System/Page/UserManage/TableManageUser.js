import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '~/store/actions/adminActions';

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
        };
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers,
            });
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id);
    };

    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user);
    };

    render() {
        // console.log('check all users: ', this.props.listUsers)
        // console.log('check state: ', this.state.usersRedux)
        let arrUsers = this.state.usersRedux;
        return (
            <React.Fragment>
                <table id="TableManageUser">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>first name</th>
                            <th>Last name</th>
                            <th>Phone number</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers &&
                            arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.phonenumber}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button onClick={() => this.handleEditUser(item)} className="btn-edit">
                                                <FontAwesomeIcon className="btn-icon" icon={faPencilAlt} />
                                            </button>
                                            <button onClick={() => this.handleDeleteUser(item)} className="btn-delete">
                                                <FontAwesomeIcon className="btn-icon" icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
