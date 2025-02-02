import { createSlice } from '@reduxjs/toolkit';

// actions
import {
    getShopReviews,
    getBeauticianReviews
} from './reviewActions'

const initialState = {
    loading: false,
    shopReviews: null,
    beauticianReviews: null,
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
