import { createSlice } from '@reduxjs/toolkit';

// actions
import {
    userRegister
} from './authActions'

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
        }
        
    }
})

export const { resetAuth } = authSlice.actions

export default authSlice.reducer