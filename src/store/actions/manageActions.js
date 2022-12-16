import * as types from '../actions/actionTypes';
import * as axios from '../../services/adminService';
import { toast } from 'react-toastify';

// get user
const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users,
});

export const loadUsers = () => {
    return async (dispatch) => {
        let res = await axios.getAllUsers('ALL');
        dispatch(getUsers(res.users.reverse()));
    };
};

// delete user
const userDeleted = () => ({
    type: types.DELETE_USER,
});

export const deleteUser = (id) => {
    return async (dispatch) => {
        await axios.deleteUserService(id);
        dispatch(userDeleted());
        dispatch(loadUsers());
        toast.success('delete user success');
    };
};

// add user
const userAdded = () => ({
    type: types.ADD_USER,
});

export const addUser = (user) => {
    return async (dispatch) => {
        await axios.createNewUserService(user);
        dispatch(userAdded());
        dispatch(loadUsers());
        toast.success('add user success');
    };
};

// edit user
const userUpdated = () => ({
    type: types.UPDATE_USER,
});
export const updateUser = (user) => {
    return async (dispatch) => {
        await axios.editUserService(user);
        dispatch(userUpdated());
        dispatch(loadUsers());
        toast.success('update user success !!!');
    };
};
