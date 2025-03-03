import { privacyApi } from './api/Privacy';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import stepsReducer from './reducers/stepsSlice';
import chatReducer from './reducers/chatSlice';
import loginReducer from './reducers/loginSlice';
import profileReducer from "./reducers/profileSlice";
import headerReducer from './reducers/headerSlice';
import createGroupReducer from "./reducers/createSlice";
import { authApi } from "./api/Auth";
import { chatApi } from './api/Chat';
import { userApi } from './api/User';
import { groupApi } from './api/Group';

const rootReducer = combineReducers({
    step: stepsReducer,
    chat: chatReducer,
    login: loginReducer,
    profile: profileReducer,
    create: createGroupReducer,
    header: headerReducer,
    [authApi.reducerPath]: authApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [privacyApi.reducerPath]: privacyApi.reducer,
    [userApi.reducerPath]: userApi.reducer,  
    [groupApi.reducerPath]: groupApi.reducer, 
})

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(authApi.middleware, chatApi.middleware, privacyApi.middleware, userApi.middleware, groupApi.middleware);
        }, 
    })
}


export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']