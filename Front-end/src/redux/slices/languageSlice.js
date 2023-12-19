import { createSlice } from '@reduxjs/toolkit'
import Vietnamese from '../../languages/vi.json'
import English from '../../languages/en.json'

const initialState = {
    value: 'vi',
    message: Vietnamese
}




export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        translate: (state, action) => {
            const newLocale = action.payload
            state.value = newLocale
            if (newLocale === 'en') {
                state.message = English
            } else {
                state.message = Vietnamese
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { translate } = languageSlice.actions

export default languageSlice.reducer