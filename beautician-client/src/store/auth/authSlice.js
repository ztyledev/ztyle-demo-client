import { createSlice } from '@reduxjs/toolkit';

// actions

import {
    getShopIds,
    beauticianLogin,
    beauticianRegister,
    requestResetPassword,
    resetPassword,
    deactivateAccount
    
    
} from './authActions'


const initialState = {
    loading: false,
    beauticianInfo: null,
    shopIds:null,
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
        [beauticianLogin.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [beauticianLogin.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.beauticianInfo = payload
            state.token = payload.token
            state.error = null
        },
        [beauticianLogin.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
         //beautician register
        [beauticianRegister.pending]: (state)=>{
            state.loading = true
            state.error =null
        },
        [beauticianRegister.fulfilled]: (state) => {
            state.loading = false
            state.success =true
        },
        [beauticianRegister.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
         // get shop ids
        [getShopIds.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getShopIds.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.shopIds = payload
            state.error = null
        },
        [getShopIds.rejected]: (state, { payload }) => {
            state.loading = false
            state.shopIds = null
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
