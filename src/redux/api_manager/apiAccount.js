import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { accountStart } from '~/redux/api_manager/accountSlice';
import { loginFailed, loginSuccess } from '~/redux/authSlice';

export const getAllAccount = async (accounts, dispatch, token,navigate) => {
  dispatch(accountStart());

    try {
        // dispatch login success
        const res = await axios.get('http://localhost:8078/api/v1/account/search',
            {
                headers: { Authorization: `Bearer ${token}` },
            }
            ,{
                "page": 1,
                "limit":4,
                "sort":"asc",
                "role_id":-1,
                "member_ship_class_id":-1,
                "status":-1
            });
        dispatch(loginSuccess(res.data));
        // toast.success('Đăng nhập thành công');
    } catch (err) {
        // dispatch login failed
        dispatch(loginFailed());
        toast.error('Đang có lỗi xảy rồi');
    }
}