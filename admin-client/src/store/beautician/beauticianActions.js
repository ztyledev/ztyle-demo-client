import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// config
import Constants from '../../config/constants';

export const getBeauticiansByShopId = createAsyncThunk(
    'beauticians/getBeauticiansByShopId',
    async ({ searchData, token }, { rejectWithValue }) => {
        
        // set header
         const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.post(
                Constants.url_beauticians_shop_id,
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

export const getBeauticianById = createAsyncThunk(
    'beautician/getBeauticianById',
    async ({ id, token }, { rejectWithValue }) => {
         // token in header
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }
        try {
            const { data } = await axios.get(
                `${Constants.url_beauticians}/${id}`,
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

export const editBeauticianById = createAsyncThunk(
    'beautician/editBeauticianById',
    async ({ beauticianData, id, token }, { rejectWithValue }) => {
         // token in header
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }

        try {
            const { data } = await axios.patch(
                `${Constants.url_beauticians}/${id}`,
                beauticianData,
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

export const deleteBeauticianById = createAsyncThunk(
    'beautician/deleteBeautician',
    async ({ id, token }, { rejectWithValue }) => {
        // header  
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.delete(
                `${Constants.url_beauticians}/${id}`,
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