import { createSlice } from '@reduxjs/toolkit';

// actions
import {
    getAdmins,
    getPendingAdmins,
    getAdminById,
    activateAdminById,
    deactivateAdminById,
    rejectAdminById,
    deleteAdminById

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
            state.pendingAdmins = null
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
        // activate admin by id
        [activateAdminById.pending]: (state) => {
            state.loadingAdmin = true
            state.error = null
            state.success =false
        },
        [activateAdminById.fulfilled]: (state, { payload }) => {
            state.loadingAdmin = false
            state.currentAdmin = payload
            state.error = null
        },
        [activateAdminById.rejected]: (state, { payload }) => {
            state.loadingAdmin = false
            state.currentAdmin=null
            state.error = payload
            state.success =false
        },
        // deactivate admin by id
        [deactivateAdminById.pending]: (state) => {
            state.loadingAdmin = true
            state.error = null
            state.success =false
        },
        [deactivateAdminById.fulfilled]: (state, { payload }) => {
            state.loadingAdmin = false
            state.currentAdmin = payload
            state.error = null
        },
        [deactivateAdminById.rejected]: (state, { payload }) => {
            state.loadingAdmin = false
            state.currentAdmin=null
            state.error = payload
            state.success =false
        },
        // reject admin by id
        [rejectAdminById.pending]: (state) => {
            state.loadingAdmin = true
            state.error = null
            state.success =false
        },
        [rejectAdminById.fulfilled]: (state, { payload }) => {
            state.loadingAdmin = false
            state.currentAdmin = payload
            state.error = null
        },
        [rejectAdminById.rejected]: (state, { payload }) => {
            state.loadingAdmin = false
            state.currentAdmin=null
            state.error = payload
            state.success =false
        },
        // delete admin by id
        [deleteAdminById.pending]: (state) => {
            state.loadingAdmin = true
            state.error = null
            state.success =false
        },
        [deleteAdminById.fulfilled]: (state) => {
            state.loadingAdmin = false
            state.currentAdmin = null
            state.error = null
        },
        [deleteAdminById.rejected]: (state, { payload }) => {
            state.loadingAdmin = false
            state.currentAdmin=null
            state.error = payload
            state.success =false
        },
         // get all admins
        [getAdmins.pending]: (state) => {
            state.loadingAdmin = true
            state.error = null
            state.success =false
        },
        [getAdmins.fulfilled]: (state, { payload }) => {
            state.loadingAdmin = false
            state.activeAdmins = payload
            state.error = null
        },
        [getAdmins.rejected]: (state, { payload }) => {
            state.loadingAdmin = false
            state.activeAdmins = null
            state.error = payload
            state.success =false
        },
    }
})



export const { resetAdmin} = adminSlice.actions
export default adminSlice.reducer
