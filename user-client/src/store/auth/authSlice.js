import { createSlice } from '@reduxjs/toolkit';

// actions
import {
    userLogin,
    userRegister,
    requestResetPassword,
    resetPassword
} from './authActions';


const initialState = {
    loading: false,
    userInfo: null,
    token: null,
    error: null,
    success: false
}

const authSlice = createSlice({
    
    name: 'auth',
    initialState,
    reducers: {
        resetAuth:()=>initialState
    },
    extraReducers: {
        // user login
        [userLogin.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [userLogin.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
            state.token = payload.token
            state.error = null
        },
        [userLogin.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

        //user register
        [userRegister.pending]: (state)=>{
            state.loading = true
            state.error =null
        },
        [userRegister.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success =true
        },
        [userRegister.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        // request reset password
        [requestResetPassword.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
        },
        [requestResetPassword.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.message = payload
            state.error = null 
        },
        [requestResetPassword.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success = false
        },
        // reset password
        [resetPassword.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success = false
        },
         [resetPassword.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.message = payload
            state.error = null
            state.success = true
        },
        [resetPassword.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success = false
        }
        
    }
})

export const { resetAuth } = authSlice.actions

export default authSlice.reducer