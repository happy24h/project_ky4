import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../Styles/UserInput.module.scss';
import { addUser } from '~/store/actions/manageActions';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function AddUser() {
    const [state, setState] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phonenumber: '',
        address: '',
    });
    let dispatch = useDispatch();

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleAddNewUser = async () => {
        if (!email || !password || !firstName || !lastName || !phonenumber || !address) {
            toast.warning('Vui lòng nhập đầy đủ thông tin');
        } else {
            dispatch(addUser(state));
            setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phonenumber: '',
                address: '',
            });
        }
    };

    let { email, password, firstName, lastName, phonenumber, address } = state;

    return (
        <div className={cx('container')}>
            <div className={cx('title')}>React Redux CRUD example with API </div>
            <form>
                <div className={cx('group')}>
                    <input type="text" required value={email} onChange={handleInputChange} name="email" />
                    <span className={cx('highlight')}></span>
                    <span className={cx('bar')}></span>
                    <label>Email</label>
                </div>
                <div className={cx('group')}>
                    <input type="text" required value={password} onChange={handleInputChange} name="password" />
                    <span className={cx('highlight')}></span>
                    <span className={cx('bar')}></span>
                    <label>Password</label>
                </div>
                <div className={cx('group')}>
                    <input type="text" required value={firstName} onChange={handleInputChange} name="firstName" />
                    <span className={cx('highlight')}></span>
                    <span className={cx('bar')}></span>
                    <label>First Name</label>
                </div>

                <div className={cx('group')}>
                    <input type="text" required value={lastName} onChange={handleInputChange} name="lastName" />
                    <span className={cx('highlight')}></span>
                    <span className={cx('bar')}></span>
                    <label>Last Name</label>
                </div>
                <div className={cx('group')}>
                    <input type="text" required value={phonenumber} onChange={handleInputChange} name="phonenumber" />
                    <span className={cx('highlight')}></span>
                    <span className={cx('bar')}></span>
                    <label>Phone Number</label>
                </div>

                <div className={cx('group')}>
                    <input type="text" required value={address} onChange={handleInputChange} name="address" />
                    <span className={cx('highlight')}></span>
                    <span className={cx('bar')}></span>
                    <label>Address</label>
                </div>
            </form>
            <button className={cx('btn-add')} onClick={() => handleAddNewUser()}>
                New Add
            </button>
        </div>
    );
}

export default AddUser;
