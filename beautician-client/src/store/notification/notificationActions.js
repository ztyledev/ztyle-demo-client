import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// config
import Constants from '../../config/constants';

export const addNotification = createAsyncThunk(
    'notification/addNotification',
    async ({ token, notification }, { rejectWithValue }) => {
        // set header
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }

         try {
            const { data } = await axios.post(
                Constants.url_notifications,
                notification,
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

export const getNotifications = createAsyncThunk(
    'notification/getNotifications',
    async ({ token, id }, { rejectWithValue }) => {
        // set header
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.get(
                `${Constants.url_notifications}/${id}`,
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

export const readNotifications = createAsyncThunk(
    'notification/readNotifications',
    async ({ token, id }, { rejectWithValue }) => {
        // set header
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.get(
                `${Constants.url_read_notifications}/${id}`,
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