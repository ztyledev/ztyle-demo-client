import { createSlice } from '@reduxjs/toolkit';

// actions
import {
    getMyShopReview,
    addShopReview,
    editShopReviewById,
    getShopReviews,
    getMyBeauticianReview,
    addBeauticianReview,
    editBeauticianReviewById,
    getBeauticianReviews
} from './reviewActions'

const initialState = {
    loading: false,
    shopReviews: null,
    currentShopReview: null,
    beauticianReviews: null,
    currentBeauticianReview: null,
    error: null,
    success:false
}

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        resetReview: () => initialState
    },
    extraReducers: {
        // get my shop review
        [getMyShopReview.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
        },
        [getMyShopReview.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.currentShopReview = payload
            state.error = null
            state.success = false
        },
        [getMyShopReview.rejected]: (state, { payload }) => {
            state.loading = false          
            state.currentShopReview = null           
            state.error = payload
            state.success = false
        },
        // add shop review
        [addShopReview.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
        },
        [addShopReview.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.currentShopReview = payload
            state.error = null
            state.success = true
        },
        [addShopReview.rejected]: (state, { payload }) => {
            state.loading = false          
            state.currentShopReview = null           
            state.error = payload
            state.success = false
        },
        // edit shop review by id
        [editShopReviewById.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
        },
        [editShopReviewById.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.currentShopReview = payload
            state.error = null
            state.success = true
        },
        [editShopReviewById.rejected]: (state, { payload }) => {
            state.loading = false          
            state.currentShopReview = null           
            state.error = payload
            state.success = false
        },
        // get shop reviews
        [getShopReviews.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
        },
        [getShopReviews.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.shopReviews =payload
            state.error = null
            state.success = false
        },
        [getShopReviews.rejected]: (state, { payload }) => {
            state.loading = false          
            state.shopReviews = null           
            state.error = payload
            state.success = false
        },
        // get my beautician review
        [getMyBeauticianReview.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
        },
        [getMyBeauticianReview.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.currentBeauticianReview = payload
            state.error = null
            state.success = false
        },
        [getMyBeauticianReview.rejected]: (state, { payload }) => {
            state.loading = false          
            state.currentBeauticianReview = null           
            state.error = payload
            state.success = false
        },
        // add beautician review
        [addBeauticianReview.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
        },
        [addBeauticianReview.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.currentBeauticianReview = payload
            state.error = null
            state.success = true
        },
        [addBeauticianReview.rejected]: (state, { payload }) => {
            state.loading = false          
            state.currentBeauticianReview = null           
            state.error = payload
            state.success = false
        },
        // edit beautician review by id
        [editBeauticianReviewById.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
        },
        [editBeauticianReviewById.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.currentBeauticianReview = payload
            state.error = null
            state.success = true
        },
        [editBeauticianReviewById.rejected]: (state, { payload }) => {
            state.loading = false          
            state.currentBeauticianReview = null           
            state.error = payload
            state.success = false
        },
        // get beautician reviews
        [getBeauticianReviews.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
        },
        [getBeauticianReviews.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.beauticianReviews =payload
            state.error = null
            state.success = false
        },
        [getBeauticianReviews.rejected]: (state, { payload }) => {
            state.loading = false          
            state.beauticianReviews = null           
            state.error = payload
            state.success = false
        },
                
    }
})

export const { resetReview } = reviewSlice.actions;
export default reviewSlice.reducer;
