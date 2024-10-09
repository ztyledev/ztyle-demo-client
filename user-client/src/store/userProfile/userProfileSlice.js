import { createSlice } from '@reduxjs/toolkit';


// actions

import {
    getUserProfile,
    addUserProfile,
    editUserProfile,
    deleteUserProfile
} from './userProfileActions'

const initialState = {
    
    loading: false,
    userProfile: null,
    error: null,
    success:false
}

const userProfileSlice = createSlice({

    name: 'userProfile',
    initialState,
    reducers: {
        resetUserProfile:()=>initialState
    },
    extraReducers: {
        // get user profile
        [getUserProfile.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success =false
        },
        [getUserProfile.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userProfile = payload
            state.error = null
            state.success =false
        },
        [getUserProfile.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success = false
        },
        // add user profile
        [addUserProfile.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success =false
        },
        [addUserProfile.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userProfile = payload
            state.success = true
            state.error = null
        },
        [addUserProfile.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success =false
        },
        // edit user profile
        //edit basic profile
        [editUserProfile.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success =false
        },
        [editUserProfile.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userProfile = payload
            state.success = true
            state.error = null
        },
        [editUserProfile.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success =false
        },
         // delete user profile
        [deleteUserProfile.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
            
        },
        [deleteUserProfile.fulfilled]: (state) => {
            state.loading = false
            state.error = null
            state.userProfile=null
            state.success =true
        },
        [deleteUserProfile.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success =false
        }
    }
})

export const { resetUserProfile } = userProfileSlice.actions
export default userProfileSlice.reducer
