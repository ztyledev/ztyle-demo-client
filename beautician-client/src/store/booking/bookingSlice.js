import { createSlice } from '@reduxjs/toolkit';

// actions
import {
    getBookingsByBeautician,
    getBookingById,
    changeBookingStatusByBeauticianById
} from './bookingActions'

const initialState = {
    loading: false,
    bookings: null,
    currentBooking: null,
    error: null
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        resetBooking:()=>initialState
    },
    extraReducers: {
         // get booking by user
        [getBookingsByBeautician.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getBookingsByBeautician.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.bookings = payload
            state.error = null
        },
        [getBookingsByBeautician.rejected]: (state, { payload }) => {
            state.loading = false
            state.bookings = null
            state.error = payload
        },
        // get booking by id
        [getBookingById.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getBookingById.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.currentBooking = payload
            state.error = null
        },
        [getBookingById.rejected]: (state, { payload }) => {
            state.loading = false
            state.currentBooking = null
            state.error = payload
        },
        // cancel booking by beautician by  id
        [changeBookingStatusByBeauticianById.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [changeBookingStatusByBeauticianById.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.currentBooking = payload
            state.error = null
        },
        [changeBookingStatusByBeauticianById.rejected]: (state, { payload }) => {
            state.loading = false
            state.currentBooking = null
            state.error = payload
        },
    }

})


export const { resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer