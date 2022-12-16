import React, { useState } from 'react';
import Register from './Register';
import CreateSuccess from './CreateSuccess';

const Form = () => {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false);
    const submitForm = () => {
        setFormIsSubmitted(true);
    };

    return <div>{!formIsSubmitted ? <Register submitForm={submitForm} /> : <CreateSuccess />}</div>;
};

export default Form;
