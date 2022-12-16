import * as types from '../actions/actionTypes';
const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],
    allRequiredDoctorInfor: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState,
            };

        case types.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,
            };
        case types.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            };

        case types.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDr;
            return {
                ...state,
            };

        case types.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = [];
            return {
                ...state,
            };

        case types.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state,
            };

        case types.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state,
            };

        case types.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data;
            return {
                ...state,
            };

        case types.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            state.allRequiredDoctorInfor = [];
            return {
                ...state,
            };

        case types.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            };

        case types.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state,
            };

        case types.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            };

        case types.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state,
            };

        case types.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            };

        case types.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default adminReducer;
