import { createSlice } from '@reduxjs/toolkit';

// actions
import {
    getPendingAdmins,
    getAdminById
} from './adminActions'


const initialState = {
    loadingAdmin: false,
    currentAdmin: null,
    pendingAdmins: null,
    activeAdmins: null,
    error: null,
    success: false
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        resetAdmin:()=>initialState
    },
    extraReducers: {
        // get pending admins
        [getPendingAdmins.pending]: (state) => {
            state.loadingAdmin = true
            state.error = null
            state.success =false
        },
        [getPendingAdmins.fulfilled]: (state, { payload }) => {
            state.loadingAdmin = false
            state.pendingAdmins = payload
            state.error = null
        },
        [getPendingAdmins.rejected]: (state, { payload }) => {
            state.loadingAdmin = false
            state.error = payload
            state.success =false
        },
         // get admin by id
        [getAdminById.pending]: (state) => {
            state.loadingAdmin = true
            state.error = null
            state.success =false
        },
        [getAdminById.fulfilled]: (state, { payload }) => {
            state.loadingAdmin = false
            state.currentAdmin = payload
            state.error = null
        },
        [getAdminById.rejected]: (state, { payload }) => {
            state.loadingAdmin = false
            state.currentAdmin=null
            state.error = payload
            state.success =false
        },
    }
})


export const { resetAdmin} = adminSlice.actions
export default adminSlice.reducer
