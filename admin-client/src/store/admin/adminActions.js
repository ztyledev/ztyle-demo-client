import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// config
import Constants from '../../config/constants';

export const getPendingAdmins = createAsyncThunk(
    'admins/pendingAdmins',
    async ({ token }, { rejectWithValue }) => {

        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.get(Constants.url_admins_pending, config);
            if (data) {
                return data
            }
            else {
                return null
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

export const getAdminById = createAsyncThunk(
    'shop/getShopById',
    async ({ id, token }, { rejectWithValue }) => {
         // token in header
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }
        try {
            const { data } = await axios.get(
                `${Constants.url_admins}/${id}`,
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