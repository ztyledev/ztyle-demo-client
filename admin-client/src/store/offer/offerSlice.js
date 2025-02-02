import { createSlice } from '@reduxjs/toolkit';

// actions
import {
    getOffers,
    getOfferById,
    getOfferByOfferCode,
    addOffer,
    editOfferById,
    deleteOfferById
} from './offerActions'

const initialState = {
    loading: false,
    offers: null,
    currentOffer: null,
    error: null,
    success: false
}

const offerSlice = createSlice({
    name: 'offer',
    initialState,
    reducers: {
        resetOffer:()=>initialState
    },
    extraReducers: {
         // get offers
        [getOffers.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getOffers.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.offers = payload
            state.error = null
        },
        [getOffers.rejected]: (state, { payload }) => {
            state.loading = false
            state.offers = null
            state.error = payload
        },
        // get offer by id
        [getOfferById.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getOfferById.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.currentOffer = payload
            state.error = null
        },
        [getOfferById.rejected]: (state, { payload }) => {
            state.loading = false
            state.currentOffer = null
            state.error = payload
        },
        // get offer by offer code
        [getOfferByOfferCode.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getOfferByOfferCode.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.offers = payload
            state.error = null
        },
        [getOfferByOfferCode.rejected]: (state, { payload }) => {
            state.loading = false
            state.offers = null
            state.error = payload
        },
        // add offer
        [addOffer.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
        },
        [addOffer.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.currentOffer = payload
            state.success=true
            state.error = null
        },
        [addOffer.rejected]: (state, { payload }) => {
            state.loading = false
            state.currentOffer = null
            state.success = false
            state.error = payload
        },
        // edit offer by id
        [editOfferById.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success = false
        },
        [editOfferById.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.currentOffer = payload
            state.success = true
            state.error = null
        },
        [editOfferById.rejected]: (state, { payload }) => {
            state.loading = false
            state.currentOffer = null
            state.success = false
            state.error = payload
        },
        //delete Offer by id
        [deleteOfferById.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
        },
        [deleteOfferById.fulfilled]: (state) => {
            state.loading = false
            state.currentOffer = null
            state.error = null
        },
        [deleteOfferById.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success =false
        },
        
    }

})

export const { resetOffer } = offerSlice.actions;
export default offerSlice.reducer;
