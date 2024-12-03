import { createSlice } from '@reduxjs/toolkit';

// actions
import {
    adminLogin,
    adminRegister,
    requestResetPassword,
    resetPassword,
    deactivateAccount
} from './authActions'

const initialState = {
    loading: false,
    adminInfo: null,
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
         // admin login
        [adminLogin.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [adminLogin.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.adminInfo = payload
            state.token = payload.token
            state.error = null
        },
        [adminLogin.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
         //admin register
        [adminRegister.pending]: (state)=>{
            state.loading = true
            state.error =null
        },
        [adminRegister.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success =true
        },
        [adminRegister.rejected]: (state, { payload }) => {
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
        },
        //  deactivate account
        [deactivateAccount.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
            
        },
        [deactivateAccount.fulfilled]: (state) => {
            state.loading = false
            state.error = null
            // state.userInfo=null
            state.success =true
        },
        [deactivateAccount.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success =false
        }
    }

})

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer

