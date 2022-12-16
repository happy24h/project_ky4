import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '../../Styles/UserInput.module.scss';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateUser } from '~/store/actions/manageActions';
const cx = classNames.bind(styles);
function EditUser({ currentUser, setLayout, layout }) {
    const [state, setState] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phonenumber: '',
        address: '',
    });
    let dispatch = useDispatch();
    useEffect(() => {
        let user = currentUser;
        if (user) {
            setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                phonenumber: user.phonenumber,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            });
        }
    }, [currentUser]);

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };
    console.log('state redux---', state);

    const handleUpdateUser = () => {
        if (!email || !password || !firstName || !lastName || !phonenumber || !address) {
            toast.warning('Vui lòng nhập đầy đủ thông tin');
        } else {
            dispatch(updateUser(state));
            setLayout(!layout);
        }
    };

    let { email, password, firstName, lastName, phonenumber, address } = state;
    return (
        <div className={cx('container')}>
            <div className={cx('title')}>Edit User </div>
            <form>
                <div className={cx('group')}>
                    <input type="text" required value={email} name="email" onChange={handleInputChange} />
                    <span className={cx('highlight')}></span>
                    <span className={cx('bar')}></span>
                    <label>Email</label>
                </div>
                <div className={cx('group')}>
                    <input type="text" required value={password} name="password" onChange={handleInputChange} />
                    <span className={cx('highlight')}></span>
                    <span className={cx('bar')}></span>
                    <label>Password</label>
                </div>
                <div className={cx('group')}>
                    <input type="text" required value={firstName} name="firstName" onChange={handleInputChange} />
                    <span className={cx('highlight')}></span>
                    <span className={cx('bar')}></span>
                    <label>First Name</label>
                </div>

                <div className={cx('group')}>
                    <input type="text" required value={lastName} name="lastName" onChange={handleInputChange} />
                    <span className={cx('highlight')}></span>
                    <span className={cx('bar')}></span>
                    <label>Last Name</label>
                </div>
                <div className={cx('group')}>
                    <input type="text" required value={phonenumber} name="phonenumber" onChange={handleInputChange} />
                    <span className={cx('highlight')}></span>
                    <span className={cx('bar')}></span>
                    <label>Phone Number</label>
                </div>

                <div className={cx('group')}>
                    <input type="text" required value={address} name="address" onChange={handleInputChange} />
                    <span className={cx('highlight')}></span>
                    <span className={cx('bar')}></span>
                    <label>Address</label>
                </div>
            </form>
            <button className={cx('btn-add')} onClick={() => handleUpdateUser()}>
                Update User
            </button>
        </div>
    );
}

export default EditUser;
