import { createSlice } from '@reduxjs/toolkit';

// actions
import {
    getBeauticianReviews
} from './reviewActions'

const initialState = {
    loading: false,
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
