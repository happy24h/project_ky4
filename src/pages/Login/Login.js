import React, { useState } from 'react';
// import validation from './validation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import '../Register/Register.scss';
import { loginUser } from '../../redux/apiRequest';
import { faEnvelope, faEye, faKey } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
// import * as axios from '~/services/adminService';
// import { toast } from 'react-toastify';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            // username: Yup.string().required('Vui lòng nhập tên người dùng').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            email: Yup.string()
                .required('Vui lòng nhập email.')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập địa chỉ email hợp lệ.'),
            password: Yup.string().required('Vui lòng nhập mật khẩu.').min(3, 'Mật khẩu phải lớn hơn 3 ký tự.'),
        }),
        onSubmit: (values) => {
            // window.alert('Form submitted');
            console.log(values);
            loginUser(values, dispatch, navigate);
        },
    });

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container-login">
            <form className="loginForm" onSubmit={formik.handleSubmit}>
                <h1 className="heading">Login</h1>
                <div className="socialLogins">
                    <button className="socialLogin1">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </button>
                    <button className="socialLogin2">
                        <FontAwesomeIcon icon={faLinkedinIn} />
                    </button>
                    <button className="socialLogin3">
                        <FontAwesomeIcon icon={faGoogle} />
                    </button>
                </div>
                <span className="standardText">Or use your email instead</span>
                {/* <div className="field">
                    <div className="customInput">
                        <FontAwesomeIcon className="inputicon" icon={faUser} />
                        <input
                            className="inputfield"
                            type="text"
                            placeholder="Name"
                            autoComplete="username"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="message">
                        {formik.errors.username && <p className="error">{formik.errors.username}</p>}
                    </div>
                </div> */}
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
                        <FontAwesomeIcon className="inputicon" icon={faKey} />
                        <input
                            className="inputfield"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password.."
                            autoComplete="new-password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        <FontAwesomeIcon onClick={handleShowPassword} className="inputicon" icon={faEye} />
                    </div>
                    <div className="message">
                        {formik.errors.password && <p className="error">{formik.errors.password}</p>}
                    </div>
                </div>
                <div className="field">
                    <span className="linkfield">Forgot Password?</span>
                </div>
                <div className="field submitfield">
                    <input className="submit" type="submit" value="SIGN IN" />
                </div>
                <div className="field signupfield">
                    <span className="linkfield">
                        <Link to="/register">New User? Sign up here</Link>
                    </span>
                </div>
            </form>
        </div>
    );
};
export default Login;
