import { configureStore } from '@reduxjs/toolkit'
import languageReducer from '../redux/slices/languageSlice'
import userReducer from './slices/userSlice'
import { persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit'


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userRedux'],
}

const reducer = combineReducers({
    language: languageReducer,
    userRedux: userReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})