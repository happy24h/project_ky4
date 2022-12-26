import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './CreateAccount.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faKey, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { createAccount, getAllAccount, getAllRoles } from '~/redux/apiRequest';
import { Button, Modal } from 'antd';
// import { registerUser } from '../../redux/apiRequest';

function CreateAccount({ loadApi, accessToken }) {
    // console.log('check access token', accessToken);
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
    const navigate = useNavigate();

    useEffect(() => {
        getAllRoles(dispatch, accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const listRoles = useSelector((state) => state.role.role?.roleCurrent);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            phone: '',
            gender: '',
            roles:[]
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng nhập tên người dùng.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            email: Yup.string()
                .required('Vui lòng nhập email.')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập địa chỉ email hợp lệ.'),
            password: Yup.string()
                .required('Vui lòng nhập mật khẩu.')
                // .matches(
                //     /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                //     'Mật khẩu phải là 7-19 ký tự và chứa ít nhất một chữ cái, một số và một ký tự đặc biệt.',
                // )
            ,
            phone: Yup.string()
                .required('Vui lòng nhập số điện thoại.')
                // .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Phải là số điện thoại hợp lệ')
            ,
            gender: Yup.string().required('Vui lòng xác nhận giới tính.').min(3, 'Tên phải lớn hơn 3 ký tự.'),
        }),
        onSubmit: async (values) => {
            const submitValue = {
                ...values,
                roles: values.roles.map((e) => ({
                    name: e
                }))
            };

            console.log(submitValue);

            // createAccountCustomer(values, dispatch, accessToken);
            await createAccount(submitValue, dispatch, accessToken);
            loadApi();
        },
    });

    return (
        <div style={{ marginTop: 23 }}>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal title="Modal Account" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
                {/* <h1 className="heading">Tạo tài khoản</h1>

                <span className="standardText">Nhập thông tin tại đậy</span> */}
                <form className="loginForm" onSubmit={formik.handleSubmit} style={{ width: '950px' }}>
                    <div className="field">
                        <div className="customInput">
                            <FontAwesomeIcon className="inputicon" icon={faUser} />
                            <input
                                className="inputfield"
                                type="text"
                                placeholder="Name..."
                                autoComplete="username"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="message">
                            {formik.errors.name && <p className="error">{formik.errors.name}</p>}
                        </div>
                    </div>
                    <div className="field">
                        <div className="customInput">
                            <FontAwesomeIcon className="inputicon" icon={faEnvelope} />
                            <input
                                className="inputfield"
                                type="email"
                                placeholder="Email.."
                                autoComplete="username"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="message">
                            {formik.errors.email && <p className="error">{formik.errors.email}</p>}
                        </div>
                    </div>
                    <div className="field">
                        <div className="customInput">
                            <FontAwesomeIcon className="inputicon" icon={faPhone} />
                            <input
                                className="inputfield"
                                type="text"
                                placeholder="Phone..."
                                autoComplete="username"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="message">
                            {formik.errors.phone && <p className="error">{formik.errors.phone}</p>}
                        </div>
                    </div>
                    <div className="field">
                        <div className="customInput">
                            <FontAwesomeIcon className="inputicon" icon={faKey} />
                            <input
                                className="inputfield"
                                type="password"
                                placeholder="Password.."
                                autoComplete="new-password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="message">
                            {formik.errors.password && <p className="error">{formik.errors.password}</p>}
                        </div>
                    </div>
                    <div class="field">
                        <div className="customInput radio-input">
                            <label for="password_confirmation" class="form-label">
                                <strong>Giới tính: </strong>
                            </label>
                            <div className="radio-input-col">
                                <input
                                    name="gender"
                                    type="radio"
                                    value="MALE"
                                    class="form-control"
                                    onChange={formik.handleChange}
                                />
                                <span>Nam</span>
                            </div>
                            <div className="radio-input-col">
                                <input
                                    name="gender"
                                    type="radio"
                                    value="FEMALE"
                                    class="form-control"
                                    onChange={formik.handleChange}
                                />
                                <span>Nữ</span>
                            </div>
                            {/*<div className="radio-input-col">*/}
                            {/*    <input*/}
                            {/*        name="gender"*/}
                            {/*        type="radio"*/}
                            {/*        value="OTHER"*/}
                            {/*        class="form-control"*/}
                            {/*        onChange={formik.handleChange}*/}
                            {/*    />*/}
                            {/*    <span>Khác</span>*/}
                            {/*</div>*/}
                        </div>
                        <div className="message">
                            {formik.errors.gender && <p className="error">{formik.errors.gender}</p>}
                        </div>
                        <div>
                            {
                                listRoles && listRoles.map((item, index) => {
                                    return(
                                        <li key={index}>
                                            <input
                                                type="checkbox"
                                                id={item.name}
                                                name="roles"
                                                value={item.name}
                                                onChange={formik.handleChange}
                                                // checked={item.name === CheckedValue}
                                                // onChange={handleCheckboxChange}
                                            />
                                            <label htmlFor={item.name} className="text-sm ml-1">
                                                {item.name}
                                            </label>
                                        </li>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="field submitfield" style={{ width: '700px' }}>
                        <input className="submit" type="submit" value="ADD USER" />
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default CreateAccount;
