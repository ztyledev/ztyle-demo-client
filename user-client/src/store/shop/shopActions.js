import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// config
import Constants from '../../config/constants';

export const getShops = createAsyncThunk(
    'shop/getShops',
    async ({ token }, { rejectWithValue }) => {
        // setting header in token
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }

        }

        try {
            const { data } = await axios.get(
                Constants.url_shops,
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

export const getShopById = createAsyncThunk(
    'shop/getShopById',
    async ({ id, token }, { rejectWithValue }) => {
        // setting header in token
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }

        }

        try {
            const { data } = await axios.get(
                `${Constants.url_shops}/${id}`,
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

export const getShopMenu = createAsyncThunk(
    'shop/getMenu',
    async ({ searchData, token }, { rejectWithValue }) => {
        // setting header in token
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }

        }
        try {
            const { data } = await axios.post(
                Constants.url_menu_shops,
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

export const getMenuItem = createAsyncThunk(
    'shop/getMenuItem',
    async ({ item, token }, { rejectWithValue }) => {
        
        try {
            if (item && token) {
                return item;
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