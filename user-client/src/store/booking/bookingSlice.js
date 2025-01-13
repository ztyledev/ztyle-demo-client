import { createSlice } from '@reduxjs/toolkit';

// actions
import {
    getSlots,
    addBookingByUser,
    getBookingById,
    getBookingsByUser,
    changeBookingStatusByUserById
} from './bookingActions'

const initialState = {
    loading: false,
    slotDetails: null,
    selectedSlot: null,
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
         // get slots
        [getSlots.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getSlots.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.slotDetails = payload
            state.error = null
        },
        [getSlots.rejected]: (state, { payload }) => {
            state.loading = false
            state.slotDetails = null
            state.error = payload
        },
        // add booking
        [addBookingByUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [addBookingByUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.currentBooking = payload
            state.error = null
        },
        [addBookingByUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.currentBooking = null
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
         // get booking by user
        [getBookingsByUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getBookingsByUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.bookings = payload
            state.error = null
        },
        [getBookingsByUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.bookings = null
            state.error = payload
        },
        // change booking status by user by  id
        [changeBookingStatusByUserById.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [changeBookingStatusByUserById.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.currentBooking = payload
            state.error = null
        },
        [changeBookingStatusByUserById.rejected]: (state, { payload }) => {
            state.loading = false
            state.currentBooking = null
            state.error = payload
        },
        
    }

})

export const { resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer
