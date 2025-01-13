import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// config
import Constants from '../../config/constants';


export const getBookingsByBeautician = createAsyncThunk(
    'booking/getBookingByBeautician',
    async ({ searchData, token }, { rejectWithValue }) => {
        // setting header in token
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }

        }
        try {
            const { data } = await axios.post(
                Constants.url_my_bookings,
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

export const getBookingById = createAsyncThunk(
    'booking/getBookingById',
    async ({ id, token }, { rejectWithValue }) => {
        
         // setting header in token
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }

        }
        try {
            const { data } = await axios.get(
                `${Constants.url_bookings}/${id}`,
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

export const changeBookingStatusByBeauticianById = createAsyncThunk(
    'booking/chaneBookingStatusByBeautician',
    async ({ id,bookingData, token }, { rejectWithValue }) => {
        // setting header in token
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }

        }
        try {
            
            const { data } = await axios.patch(
                `${Constants.url_bookings}/${id}`,
                bookingData,
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