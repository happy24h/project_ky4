import React from 'react';
import Login from './Login';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Form = () => {
    const user = useSelector((state) => state.auth.login?.currentUser?.username);

    return <div>{!user ? <Login /> : <Outlet />}</div>;
};
export default Form;
