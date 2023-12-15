import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 'vi',
}

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        translateToEn: (state) => {
            state.value = 'en'
        },
        translateToVi: (state) => {
            state.value = 'vi'
        }

    },
})

// Action creators are generated for each case reducer function
export const { translateToEn, translateToVi } = languageSlice.actions

export default languageSlice.reducer