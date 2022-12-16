import React, { useState, useEffect } from 'react';
import validation from './validation';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import '../Register/Register.scss';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import * as axios from '~/services/adminService';
import { toast } from 'react-toastify';

const Login = ({ submitForm }) => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [dataIsCorrect, setDataIsCorrect] = useState(false);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };
    const handleFormSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
        setDataIsCorrect(true);
    };
    useEffect(() => {
        const fetchApi = async () => {
            let res = await axios.handleLoginApi(values.email, values.password);
            if (res && res.errCode === 0) {
                if (Object.keys(errors).length === 0 && dataIsCorrect) {
                    submitForm(true);
                    navigate('/system/user-manage');
                    setErrors(validation(values));
                }
            } else {
                toast.error('Vui lòng nhập đúng thông tin!');
            }
        };
        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors]);

    let { email, password } = values;
    console.log('value login ', values);
    return (
        <div className="container-login">
            <form className="loginForm">
                <h1 className="heading">Sign In With</h1>
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
                        <FontAwesomeIcon className="inputicon" icon={faEnvelope} />
                        <input
                            className="inputfield"
                            type="email"
                            placeholder="Email.."
                            autoComplete="username"
                            name="email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="message">{errors.email && <p className="error">{errors.email}</p>}</div>
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
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="message">{errors.password && <p className="error">{errors.password}</p>}</div>
                </div>
                <div className="field">
                    <span className="linkfield">Forgot Password?</span>
                </div>
                <div className="field submitfield" onClick={handleFormSubmit}>
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
