import { createSlice } from '@reduxjs/toolkit';

// actions

import {
    getBeauticiansByShopId,
    getBeauticianById,
    editBeauticianById,
    deleteBeauticianById
} from './beauticianActions'

const initialState = {
    loadingBeautician: false,
    currentBeautician: null,
    beauticians: null,
    error:null
}

const beauticianSlice = createSlice({
    name: 'beautician',
    initialState,
    reducers: {
        resetBeautician:()=>initialState
    },
    extraReducers: {
         // get beauticians by shop id
        [getBeauticiansByShopId.pending]: (state) => {
            state.loadingBeautician= true
            state.error = null
        },
        [getBeauticiansByShopId.fulfilled]: (state, { payload }) => {
            state.loadingBeautician = false
            state.beauticians = payload
            state.error = null
        },
        [getBeauticiansByShopId.rejected]: (state, { payload }) => {
            state.loadingBeautician = false
            state.beauticians=null
            state.error = payload
            
        },
        // get beautician by id
        [getBeauticianById.pending]: (state) => {
            state.loadingBeautician = true
            state.error = null
        },
        [getBeauticianById.fulfilled]: (state, { payload }) => {
            state.loadingBeautician = false
            state.currentBeautician = payload
            state.error = null
        },
        [getBeauticianById.rejected]: (state, { payload }) => {
            state.loadingBeautician = false
            state.currentBeautician=null
            state.error = payload
        },
        // edit beautician by id
        [editBeauticianById.pending]: (state) => {
            state.loadingBeautician = true
            state.error = null
        },
        [editBeauticianById.fulfilled]: (state, { payload }) => {
            state.loadingBeautician = false
            state.currentBeautician = payload
            state.error = null
        },
        [editBeauticianById.rejected]: (state, { payload }) => {
            state.loadingBeautician = false
            state.currentBeautician=null
            state.error = payload
        },
        // delete beautician
        [deleteBeauticianById.pending]: (state) => {
            state.loadingBeautician = true
            state.error = null
            
        },
        [deleteBeauticianById.fulfilled]: (state) => {
            state.loadingBeautician = false
            state.currentBeautician = null
            state.error = null
        },
        [deleteBeauticianById.rejected]: (state, { payload }) => {
            state.loadingBeautician = false
            state.error = payload
           
        },
    }

})

export const { resetBeautician } = beauticianSlice.actions;
export default beauticianSlice.reducer;
