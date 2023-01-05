// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './authSlice';
// export default configureStore({
//     reducer: {
//         auth: authReducer,
//     },
// });

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import accountReducer from './accountSlice';
import roleReducer from './roleSlice';
import feedbackReducer from './feedback/feedbackSlice';

import blogReducer from './blog/blogSlice';

import serviceReducer from './service/serviceSilce';
import cloudReducer from './cloudImage/cloudSlice';
import typeServiceReducer from './type_service/typeServiceSilce';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};
const rootReducer = combineReducers({
    auth: authReducer,
    account: accountReducer,
    feedback: feedbackReducer,
    role: roleReducer,

    blog: blogReducer,

    service: serviceReducer,
    cloudImage: cloudReducer,
    typeService: typeServiceReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
