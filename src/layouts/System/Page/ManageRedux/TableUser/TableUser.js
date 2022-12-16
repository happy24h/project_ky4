import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

import AddUser from '../AddUser';
import EditUser from '../EditUser';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers, deleteUser } from '~/store/actions/manageActions';

import './TableUser.scss';

function TableUser() {
    const [layout, setLayout] = useState(true);
    const [edit, setEdit] = useState({ currentEdit: {} });
    let dispatch = useDispatch();
    const { users } = useSelector((state) => state.dataUsers);
    console.log({ users });

    useEffect(() => {
        dispatch(loadUsers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    };

    //edit crud
    const handleEditUser = (user) => {
        console.log('check edit user redux ', user);
        setEdit({
            currentEdit: user,
        });
        setLayout(!layout);
    };

    return (
        <div className="container">
            {layout ? <AddUser /> : <EditUser currentUser={edit.currentEdit} layout={layout} setLayout={setLayout} />}
            <div>
                <table id="TableManageUser">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>

                        {users.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.phonenumber}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className="btn-edit" onClick={() => handleEditUser(item)}>
                                            <FontAwesomeIcon
                                                className="btn-icon"
                                                icon={faPencilAlt}
                                                onClick={() => setLayout(false)}
                                            />
                                        </button>
                                        <button className="btn-delete" onClick={() => handleDelete(item.id)}>
                                            <FontAwesomeIcon className="btn-icon" icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableUser;
