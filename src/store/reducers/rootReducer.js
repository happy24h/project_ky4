import { combineReducers } from 'redux';
import manageReducer from './manageReducer';
import adminReducer from './adminReducer';

const allReducer = combineReducers({
    dataUsers: manageReducer,
    admin: adminReducer,
});

export default allReducer;
