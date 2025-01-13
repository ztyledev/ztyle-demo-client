import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// config
import Constants from '../../config/constants';


export const getPaymentByBookingId = createAsyncThunk(
    'payment/getPaymentByBookingId',
    async ({ id, token }, { rejectWithValue }) => {
        // setting header in token
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }

        }
        try {
            const { data } = await axios.get(
                `${Constants.url_payments_by_booking_id}/${id}`,
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