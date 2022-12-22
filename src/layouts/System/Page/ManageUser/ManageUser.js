import "./ManageUser.scss"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllAccount } from '~/redux/api_manager/apiAccount';
function ManageUser() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.login?.currentUser);
    const accounts = useSelector(state => state.account.listAccounts.currentAccounts)

    useEffect(()=>{
        if (user?.accessToken){
            getAllAccount({
                "page": 1,
                "limit":4,
                "sort":"asc",
                "role_id":-1,
                "member_ship_class_id":-1,
                "status":-1
            }, dispatch,user?.accessToken);
        }
    })
    return <div>
        <div className="container">

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

                    </tbody>
                </table>
            </div>
        </div>
    </div>;
}

export default ManageUser;
