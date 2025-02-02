import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// config
import Constants from '../../config/constants';

export const getOffers = createAsyncThunk(
    'offer/getOffers',
    async ({ token }, { rejectWithValue }) => {
        // token in header
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }
        try {
            const { data } = await axios.get(
                Constants.url_offers,
                config
            )
            if (data) {
                return data;
            }
            else {
                return null;
            }
            
        }
        catch (err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)

export const getOfferById = createAsyncThunk(
    'offer/getOfferById',
    async ({ id, token }, { rejectWithValue }) => {
        // token in header
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }

        try {
            const { data } = await axios.get(
                `${Constants.url_offers}/${id}`,
                config
            )
            if (data) {
                return data;
            }
            else {
                return null;
            }
            
        }
        catch (err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)

export const getOfferByOfferCode = createAsyncThunk(
    'offer/getOfferByOfferCode',
    async ({ searchData, token }, { rejectWithValue }) => {
        // token in header
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }
        try {
            const { data } = await axios.post(
                Constants.url_offer_by_code,
                searchData,
                config
            )
            if (data) {
                return data;
            }
            else {
                return null;
            }
            
        }
        catch (err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)

export const addOffer = createAsyncThunk(
    'offer/addOffer',
    async ({ offerData, token }, { rejectWithValue }) => {
        // token in header
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }

        try {
            
            const { data } = await axios.post(
                Constants.url_offers,
                offerData,
                config
            )
            if (data) {
                return data;
            }
            else {
                return null;

            }
        }
        catch (err) {
            if (err.response && err.response.data.message) {            
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)

export const editOfferById = createAsyncThunk(
    'offer/editOfferById',
    async ({ id, offerData, token }, { rejectWithValue }) => {
        // token in header
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }

        try {
            const { data } = await axios.patch(
                `${Constants.url_offers}/${id}`,
                offerData,
                config
            )
            if (data) {
                return data;
            }
            else {
                return null;
            }
            
        }
        catch (err) {
            if (err.response && err.response.data.message) {            
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)

export const deleteOfferById = createAsyncThunk(
    'offer/deleteOfferById',
    async ({ id, token }, { rejectWithValue }) => {
        // token in header
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }

        try {
            const { data } = await axios.delete(
                `${Constants.url_offers}/${id}`,
                config
            )

            return data;

        }
        catch (err) {
            if (err.response && err.response.data.message) {            
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)