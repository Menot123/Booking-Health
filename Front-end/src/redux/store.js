import { configureStore } from '@reduxjs/toolkit'
import languageReducer from '../redux/slices/languageSlice'

export const store = configureStore({
    reducer: {
        language: languageReducer,
    },
})