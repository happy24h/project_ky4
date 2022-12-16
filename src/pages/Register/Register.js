import React, { useState, useEffect } from 'react';
import validation from './validation';
import './Register.scss';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

function Register({ submitForm }) {
    const [state, setState] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(state));
        setDataIsCorrect(true);
    };
    useEffect(() => {
        if (Object.keys(errors).length === 0 && dataIsCorrect) {
            submitForm(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors]);
    const { email, password, confirmPassword } = state;
    return (
        <div className="container-login">
            <form className="loginForm">
                <h1 className="heading">Create Account</h1>
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
                </div>
                <div className="field submitfield" onClick={handleFormSubmit}>
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
