import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import './CreateAccount.scss';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { createAccount } from '~/redux/apiRequest';
import { Button, Modal } from 'antd';
import classNames from 'classnames/bind';
import styles from './CreateAccount.module.scss';
// import { registerUser } from '../../redux/apiRequest';
const cx = classNames.bind(styles);

function CreateAccount({ accessToken }) {
    console.log('check access token', accessToken);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            phone: '',
            gender: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng nhập tên người dùng.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            email: Yup.string()
                .required('Vui lòng nhập email.')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập địa chỉ email hợp lệ.'),
            password: Yup.string()
                .required('Vui lòng nhập mật khẩu.')
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                    'Mật khẩu phải là 7-19 ký tự và chứa ít nhất một chữ cái, một số và một ký tự đặc biệt.',
                ),
            phone: Yup.string()
                .required('Vui lòng nhập số điện thoại.')
                .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Phải là số điện thoại hợp lệ'),
            gender: Yup.string().required('Vui lòng xác nhận giới tính.').min(3, 'Tên phải lớn hơn 3 ký tự.'),
        }),
        onSubmit: (values) => {
            console.log(values);

            createAccount(values, dispatch, accessToken, handleCancel);
            // actions.resetForm();
        },
    });

    return (
        <div style={{ marginTop: 23 }}>
            <Button type="primary" onClick={showModal}>
                Create Account
            </Button>
            <Modal title="Modal Account" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
                {/* <h1 className="heading">Tạo tài khoản</h1>

                <span className="standardText">Nhập thông tin tại đậy</span> */}
                <form className={cx('loginForm')} onSubmit={formik.handleSubmit} style={{ width: '950px' }}>
                    <div className={cx('field')}>
                        <div className={cx('customInput')}>
                            <FontAwesomeIcon className={cx('inputicon')} icon={faUser} />
                            <input
                                className={cx('inputfield')}
                                type="text"
                                placeholder="Name..."
                                autoComplete="username"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className={cx('message')}>
                            {formik.errors.name && <p className="error">{formik.errors.name}</p>}
                        </div>
                    </div>
                    <div className={cx('field')}>
                        <div className={cx('customInput')}>
                            <FontAwesomeIcon className="inputicon" icon={faEnvelope} />
                            <input
                                className={cx('inputfield')}
                                type="email"
                                placeholder="Email.."
                                autoComplete="username"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className={cx('message')}>
                            {formik.errors.email && <p className={cx('error')}>{formik.errors.email}</p>}
                        </div>
                    </div>
                    <div className={cx('field')}>
                        <div className={cx('customInput')}>
                            <FontAwesomeIcon className={cx('inputicon')} icon={faPhone} />
                            <input
                                className={cx('inputfield')}
                                type="text"
                                placeholder="Phone..."
                                autoComplete="username"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className={cx('message')}>
                            {formik.errors.phone && <p className="error">{formik.errors.phone}</p>}
                        </div>
                    </div>
                    <div className={cx('field')}>
                        <div className="customInput">
                            <FontAwesomeIcon className={cx('inputicon')} icon={faKey} />
                            <input
                                className={cx('inputfield')}
                                type="password"
                                placeholder="Password.."
                                autoComplete="new-password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className={cx('message')}>
                            {formik.errors.password && <p className={cx('error')}>{formik.errors.password}</p>}
                        </div>
                    </div>
                    <div class="field">
                        <div className={cx('customInput radio-input')}>
                            <label for="password_confirmation" class={cx('form-label')}>
                                <strong>Giới tính: </strong>
                            </label>
                            <div className={cx('radio-input-col')}>
                                <input
                                    name="gender"
                                    type="radio"
                                    value="MALE"
                                    className={cx('form-control')}
                                    onChange={formik.handleChange}
                                />
                                <span>Nam</span>
                            </div>
                            <div className="radio-input-col">
                                <input
                                    name="gender"
                                    type="radio"
                                    value="FEMALE"
                                    className={cx('form-control')}
                                    onChange={formik.handleChange}
                                />
                                <span>Nữ</span>
                            </div>
                            <div className={cx('radio-input-col')}>
                                <input
                                    name="gender"
                                    type="radio"
                                    value="OTHER"
                                    className={cx('form-control')}
                                    onChange={formik.handleChange}
                                />
                                <span>Khác</span>
                            </div>
                        </div>
                        <div className={cx('message')}>
                            {formik.errors.gender && <p className={cx('error')}>{formik.errors.gender}</p>}
                        </div>
                    </div>

                    <div className={cx('field submitfield')} style={{ width: '700px' }}>
                        <input className={cx('submit')} type="submit" value="ADD USER" />
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default CreateAccount;
