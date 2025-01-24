import { combineReducers, configureStore } from "@reduxjs/toolkit";
import stepsReducer from './reducers/stepsSlice';
import chatReducer from './reducers/chatSlice';
import headerReducer from './reducers/headerSlice';
const rootReducer = combineReducers({
    step: stepsReducer,
    chat: chatReducer,
    header: headerReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat();
        }, 
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']