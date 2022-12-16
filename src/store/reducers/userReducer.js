import * as types from '~/store/actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo,
            };
        case types.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            };
        case types.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            };
        default:
            return state;
    }
};

export default appReducer;
