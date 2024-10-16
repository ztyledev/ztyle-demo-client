import { createSlice } from '@reduxjs/toolkit';

// actions
import {
    addShop,
    getShopById,
    editShopById,
    updateShopImage,
    deleteShopImage,
    updateImage1,
    deleteImage1,
    updateImage2,
    deleteImage2,
    deleteCurrentShop
} from './shopActions'

const initialState = {
    loadingShop: false,
    currentShop: null,
    error: null,
    success:false
}

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        resetShop: () => initialState
    },
    extraReducers: {
        // add shop
        [addShop.pending]: (state) => {
            state.loadingShop = true
            state.error = null
            state.success =false
        },
        [addShop.fulfilled]: (state, { payload }) => {
            state.loadingShop = false
            state.currentShop = payload
            state.success = true
            state.error = null
        },
        [addShop.rejected]: (state, { payload }) => {
            state.loadingShop = false
            state.error = payload
            state.success =false
        },
        // get shop by id
        [getShopById.pending]: (state) => {
            state.loadingShop = true
            state.error = null
            state.success =false
        },
        [getShopById.fulfilled]: (state, { payload }) => {
            state.loadingShop = false
            state.currentShop = payload
            state.error = null
        },
        [getShopById.rejected]: (state, { payload }) => {
            state.loadingShop = false
            state.error = payload
            state.success =false
        },
        //edit basic profile
        [editShopById.pending]: (state) => {
            state.loadingShop = true
            state.error = null
            state.success =false
        },
        [editShopById.fulfilled]: (state, { payload }) => {
            state.loadingShop = false
            state.currentShop = payload
            state.success = true
            state.error = null
        },
        [editShopById.rejected]: (state, { payload }) => {
            state.loadingShop = false
            state.error = payload
            state.success =false
        },
        // update shop image
        [updateShopImage.pending]: (state) => {
            state.loadingShop = true
            state.error = null
            state.success=false
        },
        [updateShopImage.fulfilled]: (state, { payload }) => {
            state.loadingShop = false
            state.currentShop = payload
            state.error = null
        },
        [updateShopImage.rejected]: (state, { payload }) => {
            state.loadingShop = false
            state.error = payload
            state.success =false
        },
         // delete shop image
        [deleteShopImage.pending]: (state) => {
            state.loadingShop = true
            state.error = null
            state.success=false
        },
        [deleteShopImage.fulfilled]: (state, { payload }) => {
            state.loadingShop = false
            state.currentShop = payload
            state.error = null
        },
        [deleteShopImage.rejected]: (state, { payload }) => {
            state.loadingShop = false
            state.error = payload
            state.success =false
        },
        // update image1
        [updateImage1.pending]: (state) => {
            state.loadingShop = true
            state.error = null
            state.success=false
        },
        [updateImage1.fulfilled]: (state, { payload }) => {
            state.loadingShop = false
            state.currentShop = payload
            state.error = null
        },
        [updateImage1.rejected]: (state, { payload }) => {
            state.loadingShop = false
            state.error = payload
            state.success =false
        },

        // delete image1
        [deleteImage1.pending]: (state) => {
            state.loadingShop = true
            state.error = null
            state.success=false
        },
        [deleteImage1.fulfilled]: (state, { payload }) => {
            state.loadingShop = false
            state.currentShop = payload
            state.error = null
        },
        [deleteImage1.rejected]: (state, { payload }) => {
            state.loadingShop = false
            state.error = payload
            state.success =false
        },
         // update image2
        [updateImage2.pending]: (state) => {
            state.loadingShop = true
            state.error = null
            state.success=false
        },
        [updateImage2.fulfilled]: (state, { payload }) => {
            state.loadingShop = false
            state.currentShop = payload
            state.error = null
        },
        [updateImage2.rejected]: (state, { payload }) => {
            state.loadingShop = false
            state.error = payload
            state.success =false
        },

        // delete image2
        [deleteImage2.pending]: (state) => {
            state.loadingShop = true
            state.error = null
            state.success=false
        },
        [deleteImage2.fulfilled]: (state, { payload }) => {
            state.loadingShop = false
            state.currentShop = payload
            state.error = null
        },
        [deleteImage2.rejected]: (state, { payload }) => {
            state.loadingShop = false
            state.error = payload
            state.success =false
        },
        //Delete Current Shop

        [deleteCurrentShop.pending]: (state) => {
            state.loadingShop = true
            state.error = null
            state.success=false
        },
        [deleteCurrentShop.fulfilled]: (state) => {
            state.loadingShop = false
            state.currentShop = null
            state.error = null
        },
        [deleteCurrentShop.rejected]: (state, { payload }) => {
            state.loadingShop = false
            state.error = payload
            state.success =false
        },

    }
})


export const { resetShop } = shopSlice.actions;
export default shopSlice.reducer
