import React, { useState } from 'react';
import Login from './Login';
import { Outlet } from 'react-router-dom';

const Form = () => {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false);

    const submitForm = () => {
        setFormIsSubmitted(true);
    };

    return <div>{!formIsSubmitted ? <Login submitForm={submitForm} /> : <Outlet />}</div>;
};
export default Form;
