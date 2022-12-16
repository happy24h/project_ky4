import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as userService from '~/services/userService';
import * as axios from '~/services/adminService';
import AddUser from '../AddUser';
import EditUser from '../EditUser';
import { toast } from 'react-toastify';
import './TableUser.scss';

function TableUser() {
    const [loadApi, setLoadApi] = useState(true);
    const [layout, setLayout] = useState(true);
    const [arrUsers, setArrUsers] = useState([]);
    const [edit, setEdit] = useState({ currentEdit: {} });

    useEffect(() => {
        const fetchApi = async () => {
            const response = await userService.getAllUsers('ALL');
            setArrUsers(response.reverse());
        };
        fetchApi();
    }, [loadApi]);

    // Delete User
    const handleDeleteUser = async (user) => {
        console.log('click delete', user);
        try {
            await axios.deleteUserService(user.id);
            toast.success('Xóa người dùng thành công');
            setLoadApi(!loadApi);
        } catch (e) {}
    };

    // Edit user
    const handleEditUser = (user) => {
        console.log('check edit user ', user);
        setEdit({
            currentEdit: user,
        });
    };

    const updateEditUser = async (user) => {
        try {
            await axios.editUserService(user);
            toast.success('Cập nhật người dùng thành công');
            setLoadApi(!loadApi);
            setLayout(!layout);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className="container">
            {layout ? (
                <AddUser loadApi={loadApi} setLoadApi={setLoadApi} />
            ) : (
                <EditUser currentUser={edit.currentEdit} updateEditUser={updateEditUser} />
            )}
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
                        {arrUsers.map((item, index) => (
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
                                    <button className="btn-delete" onClick={() => handleDeleteUser(item)}>
                                        <FontAwesomeIcon className="btn-icon" icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableUser;
