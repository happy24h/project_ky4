import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '../../Styles/UserInput.module.scss';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);
function EditUser({ updateEditUser, currentUser }) {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phonenumber: '',
        address: '',
    });
    useEffect(() => {
        let user = currentUser;
        console.log('currentUser--->', user);
        if (user) {
            setInputs({
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

    const onChangeInput = (event, id) => {
        // good code
        let copyInputs = { ...inputs };
        copyInputs[id] = event.target.value;
        setInputs({
            ...copyInputs,
        });
    };

    const handleUpdateUser = () => {
        if (!email || !password || !firstName || !lastName || !phonenumber || !address) {
            toast.warning('Vui lòng nhập đầy đủ thông tin');
        } else {
            updateEditUser(inputs);
        }
    };
    let { email, password, firstName, lastName, phonenumber, address } = inputs;

    return (
        <div className={cx('container')}>
            <div className={cx('title')}>Edit User </div>
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
            <button className={cx('btn-add')} onClick={() => handleUpdateUser()}>
                Update User
            </button>
        </div>
    );
}

export default EditUser;
