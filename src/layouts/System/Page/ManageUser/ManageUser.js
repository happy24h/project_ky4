import './ManageUser.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccount } from '~/redux/apiRequest';
function ManageUser() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listAccount = useSelector((state) => state.account.account.accountCurrent.content);

    let dataAccount = {
        page: 1,
        limit: 4,
        sort: 'asc',
        role_id: -1,
        member_ship_class_id: -1,
        status: -1,
    };

    console.log('user', user);

    useEffect(() => {
        getAllAccount(dataAccount, dispatch, user?.accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <table id="customers">
            <tr>
                <th>id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
            </tr>

            {listAccount.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.accounts_id}</td>
                        <td>{item.accounts_name}</td>
                        <td>{item.accounts_email}</td>
                        <td>{item.phone}</td>
                        <td>{item.gender}</td>
                    </tr>
                );
            })}
        </table>
    );
}

export default ManageUser;
