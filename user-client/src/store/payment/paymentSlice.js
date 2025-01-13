import { createSlice } from '@reduxjs/toolkit';

// actions
import {
    getServicePrice,
    getPaymentByBookingId
} from './paymentActions'

const initialState = {
    loadingPayment: false,
    paymentDetails: null,
    payments: null,
    currentPayment:null,
    errorPayment: null
}

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        resetPayment:()=>initialState
    },
    extraReducers: {
        // get service price
        [getServicePrice.pending]: (state) => {
            state.loadingPayment = true
            state.errorPayment = null
        },
        [getServicePrice.fulfilled]: (state, { payload }) => {
            state.loadingPayment = false
            state.paymentDetails = payload
            state.errorPayment = null
        },
        [getServicePrice.rejected]: (state, { payload }) => {
            state.loadingPayment = false
            state.paymentDetails = null
            state.errorPayment = payload
        },
        // get payment by booking id 
        [getPaymentByBookingId.pending]: (state) => {
            state.loadingPayment = true
            state.errorPayment = null
        },
        [getPaymentByBookingId.fulfilled]: (state, { payload }) => {
            state.loadingPayment = false
            state.currentPayment = payload
            state.errorPayment = null
        },
        [getPaymentByBookingId.rejected]: (state, { payload }) => {
            state.loadingPayment = false
            state.currentPayment = null
            state.errorPayment = payload
        },
        
    }

})

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
