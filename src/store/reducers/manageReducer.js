import * as types from '../actions/actionTypes';

const initialState = {
    users: [],
    loading: true,
};

const manageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USERS:
            return {
                ...state,
                users: action.payload,
            };
        case types.DELETE_USER:
            return {
                ...state,
            };
        case types.ADD_USER:
            return {
                ...state,
            };
        case types.UPDATE_USER:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default manageReducer;
