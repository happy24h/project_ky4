import * as types from './actionTypes';
import * as axios from '~/services/adminService';
import { toast } from 'react-toastify';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.FETCH_GENDER_START });
            let res = await axios.getAllCodeService('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
        }
    };
};

export const fetchGenderSuccess = (genderData) => ({
    type: types.FETCH_GENDER_SUCCESS,
    data: genderData,
});

export const fetchGenderFailed = () => ({
    type: types.FETCH_GENDER_FAILED,
});

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await axios.getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: types.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data,
                });
            } else {
                dispatch({
                    type: types.FETCH_ALL_DOCTORS_FAILED,
                });
            }
        } catch (e) {
            dispatch({
                type: types.FETCH_ALL_DOCTORS_FAILED,
            });
        }
    };
};

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await axios.getAllCodeService('TIME');
            if (res && res.errCode === 0) {
                dispatch({
                    type: types.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data,
                });
            } else {
                dispatch({
                    type: types.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                });
            }
        } catch (e) {
            dispatch({
                type: types.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            });
        }
    };
};

export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.FETCH_REQUIRED_DOCTOR_INFOR_START });

            let resPrice = await axios.getAllCodeService('PRICE');
            let resPayment = await axios.getAllCodeService('PAYMENT');
            let resProvince = await axios.getAllCodeService('PROVINCE');
            let resSpecialty = await axios.getAllSpecialty();
            let resClinic = await axios.getAllClinic();

            if (
                resPrice &&
                resPrice.errCode === 0 &&
                resPayment &&
                resPayment.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0 &&
                resSpecialty &&
                resSpecialty.errCode === 0 &&
                resClinic &&
                resClinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data,
                };
                dispatch(fetchRequiredDoctorInforSuccess(data));
            } else {
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed());
        }
    };
};

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: types.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData,
});

export const fetchRequiredDoctorInforFailed = () => ({
    type: types.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
});

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await axios.saveDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success('Save Infor Detail Doctor Succedd!');
                dispatch({
                    type: types.SAVE_DETAIL_DOCTOR_SUCCESS,
                });
            } else {
                console.log('err res: ', res);
                toast.error('Save Infor Detail Doctor error!');
                dispatch({
                    type: types.SAVE_DETAIL_DOCTOR_FAILED,
                });
            }
        } catch (e) {
            toast.error('Save Infor Detail Doctor error!');
            console.log('SAVE_DETAIL_DOCTOR_FAILED: ', e);
            dispatch({
                type: types.SAVE_DETAIL_DOCTOR_FAILED,
            });
        }
    };
};

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await axios.getAllCodeService('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchGenderStart error', e);
        }
    };
};
export const fetchPositionSuccess = (positionData) => ({
    type: types.FETCH_POSITION_SUCCESS,
    data: positionData,
});

export const fetchPositionFailed = () => ({
    type: types.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await axios.getAllCodeService('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchGenderStart error', e);
        }
    };
};

export const fetchRoleSuccess = (roleData) => ({
    type: types.FETCH_ROLE_SUCCESS,
    data: roleData,
});

export const fetchRoleFailed = () => ({
    type: types.FETCH_ROLE_FAILED,
});
// create user crud
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await axios.createNewUserService(data);
            console.log('hoidanit check create user redux: ', res);
            if (res && res.errCode === 0) {
                toast.success('Create a new user succeed!');
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log('fetchGenderStart error', e);
        }
    };
};

export const saveUserSuccess = () => ({
    type: types.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
    type: types.CREATE_USER_FAILED,
});

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await axios.getAllUsers('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                toast.error('Fetch all user error!');
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error('Fetch all user error!');

            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersFailed error', e);
        }
    };
};

export const fetchAllUsersSuccess = (data) => ({
    type: types.FETCH_ALL_USERS_SUCCESS,
    users: data,
});

export const fetchAllUsersFailed = () => ({
    type: types.FETCH_ALL_USERS_FAILED,
});

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await axios.deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success('Delete the user succeed!');
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Delete the user error!');
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            console.log('fetchGenderStart error', e);
        }
    };
};

export const deleteUserSuccess = () => ({
    type: types.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
    type: types.DELETE_USER_SUCCESS,
});

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await axios.editUserService(data);
            if (res && res.errCode === 0) {
                toast.success('Update the user succeed!');
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Update the user error!');
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error('Update the user error!');
            dispatch(editUserFailed());
            console.log('EditUserFailed error', e);
        }
    };
};

export const editUserSuccess = () => ({
    type: types.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
    type: types.EDIT_USER_FAILED,
});
