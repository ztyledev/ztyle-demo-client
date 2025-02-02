import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import Constants from '../../config/constants';

export const getShopReviews = createAsyncThunk(
    'review/getShopReviews',
    async ({ id, token }, { rejectWithValue }) => {
        
        // setting header in token
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }

        }

        try {
            const { data } = await axios.get(
                `${Constants.url_shop_reviews_by_admin}/${id}`,
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

export const getBeauticianReviews = createAsyncThunk(
    'review/getBeauticianReviews',
    async ({ id, token }, { rejectWithValue }) => {
        
        // setting header in token
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }

        }

        try {
            const { data } = await axios.get(
                `${Constants.url_beautician_reviews_by_admin}/${id}`,
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