import { createSlice } from '@reduxjs/toolkit';

// actions
import {
    getBeauticianProfile,
    addBasicProfile,
    editBeauticianProfile,
    updateProfilePic,
    deleteProfilePic,
    deleteBeauticianProfile
} from './beauticianProfileActions'

const initialState = {
    loading: false,
    beauticianProfile: null,
    error: null,
    success: false
}

const beauticianProfileSlice = createSlice({
    name: 'beauticianProfile',
    initialState,
    reducers: {
        resetBeauticianProfile: () => initialState
    },
    extraReducers: {
        //get beautician profile
        [getBeauticianProfile.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success =false
        },
        [getBeauticianProfile.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.beauticianProfile = payload
            state.error = null
            state.success =false
        },
        [getBeauticianProfile.rejected]: (state, { payload }) => {
            state.loading = false
            state.beauticianProfile=null
            state.error = payload
            state.success = false
        },
         // add basic profile
        [addBasicProfile.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success =false
        },
        [addBasicProfile.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.beauticianProfile = payload
            state.success = true
            state.error = null
        },
        [addBasicProfile.rejected]: (state, { payload }) => {
            state.loading = false
            state.beauticianProfile=null
            state.error = payload
            state.success =false
        },
        //edit beautician profile
        [editBeauticianProfile.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success =false
        },
        [editBeauticianProfile.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.beauticianProfile = payload
            state.success = true
            state.error = null
        },
        [editBeauticianProfile.rejected]: (state, { payload }) => {
            state.loading = false
            state.beauticianProfile=null
            state.error = payload
            state.success =false
        },
         // update profile pic
        [updateProfilePic.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
        },
        [updateProfilePic.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.beauticianProfile = payload
            state.error = null
        },
        [updateProfilePic.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success =false
        },
        // delete profile pic
        [deleteProfilePic.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
        },
        [deleteProfilePic.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.beauticianProfile = payload
            state.error = null
        },
        [deleteProfilePic.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success =false
        },
         // delete beautician profile
        [deleteBeauticianProfile.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
            
        },
        [deleteBeauticianProfile.fulfilled]: (state) => {
            state.loading = false
            state.error = null
            state.beauticianProfile=null
            state.success =true
        },
        [deleteBeauticianProfile.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success =false
        }
    }

})

export const { resetBeauticianProfile } = beauticianProfileSlice.actions;
export default beauticianProfileSlice.reducer
