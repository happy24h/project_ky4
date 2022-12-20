import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Register.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { registerUser } from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Vui lòng nhập tên người dùng').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            email: Yup.string()
                .required('Vui lòng nhập email.')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập địa chỉ email hợp lệ.'),
            password: Yup.string()
                .required('Vui lòng nhập mật khẩu.')
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                    'Mật khẩu phải là 7-19 ký tự và chứa ít nhất một chữ cái, một số và một ký tự đặc biệt.',
                ),
        }),
        onSubmit: (values) => {
            window.alert('Form submitted');
            console.log(values);
            registerUser(values, dispatch, navigate);
        },
    });

    return (
        <div className="container-login">
            <form className="loginForm" onSubmit={formik.handleSubmit}>
                <h1 className="heading">Sign Up</h1>
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
                <div className="field">
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
                {/* <div className="field">
                    <div className="customInput">
                        <FontAwesomeIcon className="inputicon" icon={faKey} />
                        <input
                            className="inputfield"
                            type="password"
                            placeholder="Confirm Password.."
                            autoComplete="new-password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="message">
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    </div>
                </div> */}
                <div className="field submitfield">
                    <input className="submit" type="submit" value="SIGN UP" />
                </div>
                <div className="field signupfield">
                    <span className="linkfield">
                        <Link to="/login">Already signed up? Login here</Link>
                    </span>
                </div>
            </form>
        </div>
    );
}

export default Register;
