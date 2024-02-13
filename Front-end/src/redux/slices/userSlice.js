import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    isAuthenticated: false,
    token: '',
    role: '',
    account: {
        username: '',
        firstName: '',
        lastName: ''
    },
    currentLang: '',
    isShowCarousel: false,

}



export const userSlice = createSlice({
    name: 'userRedux',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            if (action.payload) {
                state.token = action.payload.token
                // state.account = action.payload.account
            }
            state.isAuthenticated = true
        },
        logout: (state, action) => {
            state.token = ''
            state.account = {}
            state.isAuthenticated = false
        },
        fetchAccount: (state, action) => {
            state.account = action.payload
        },
        changeUserLanguage: (state, action) => {
            state.language = action.payload
        },
        setCarousel: (state, action) => {
            state.isShowCarousel = action.payload
        },
        setRole: (state, action) => {
            state.role = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { setAuth, logout, fetchAccount, changeUserLanguage, setCarousel, setRole } = userSlice.actions

export default userSlice.reducer