import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../Styles/UserInput.module.scss';
import * as axios from '~/services/adminService';

import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function AddUser({ loadApi, setLoadApi }) {
    const [state, setState] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phonenumber: '',
        address: '',
    });

    const onChangeInput = (event, id) => {
        let copyState = { ...state };
        console.log('copy state--->', copyState);
        copyState[id] = event.target.value;
        setState({
            ...copyState,
        });
    };

    const createNewUser = async (data) => {
        try {
            await axios.createNewUserService(data);
        } catch (e) {
            console.log(e);
        }
    };

    const handleAddNewUser = async () => {
        if (!email || !password || !firstName || !lastName || !phonenumber || !address) {
            toast.warning('Vui lòng nhập đầy đủ thông tin');
        } else {
            await createNewUser(state);
            toast.success('Tạo người dùng thành công');

            setLoadApi(!loadApi);
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
            <div className={cx('title')}>Quản lý danh sách người dùng</div>
            <form>
                <div className={cx('group')}>
                    <input
                        type="text"
                        required
                        value={email}
                        onChange={(event) => {
                            onChangeInput(event, 'email');
                        }}
                    />
                    <span className={cx('highlight')}></span>
                    <span className={cx('bar')}></span>
                    <label>Email</label>
                </div>
                <div className={cx('group')}>
                    <input
                        type="text"
                        required
                        value={password}
                        onChange={(event) => {
                            onChangeInput(event, 'password');
                        }}
                    />
                    <span className={cx('highlight')}></span>
                    <span className={cx('bar')}></span>
                    <label>Password</label>
                </div>
                <div className={cx('group')}>
                    <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(event) => {
                            onChangeInput(event, 'firstName');
                        }}
                    />
                    <span className={cx('highlight')}></span>
                    <span className={cx('bar')}></span>
                    <label>First Name</label>
                </div>

                <div className={cx('group')}>
                    <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(event) => {
                            onChangeInput(event, 'lastName');
                        }}
                    />
                    <span className={cx('highlight')}></span>
                    <span className={cx('bar')}></span>
                    <label>Last Name</label>
                </div>
                <div className={cx('group')}>
                    <input
                        type="text"
                        required
                        value={phonenumber}
                        onChange={(event) => {
                            onChangeInput(event, 'phonenumber');
                        }}
                    />
                    <span className={cx('highlight')}></span>
                    <span className={cx('bar')}></span>
                    <label>Phone Number</label>
                </div>

                <div className={cx('group')}>
                    <input
                        type="text"
                        required
                        value={address}
                        onChange={(event) => {
                            onChangeInput(event, 'address');
                        }}
                    />
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
