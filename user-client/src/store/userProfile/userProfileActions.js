import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// config
import Constants from '../../config/constants';

export const getUserProfile = createAsyncThunk(
    
    'userProfile/getUserProfile',
    async ({ email, token }, { rejectWithValue }) => {
        
        // setting header in token
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }

        }

        try {
            
            const profileDate = { email };
            const { data } = await axios.post(
                Constants.url_user_profile,
                profileDate,
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

export const addUserProfile = createAsyncThunk(
    'userProfile/addUserProfile',
    async ({ profileData, token }, { rejectWithValue }) => {
        // token in header
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }

        try {
            
            const { data } = await axios.post(
                Constants.url_user_profiles,
                profileData,
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

export const editUserProfile = createAsyncThunk(
    'userProfile/editUserProfile',
    async ({ profileData, _id, token }, { rejectWithValue }) => {
        // token in header
 
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }
        try {
            
            const { data } = await axios.patch(
                `${Constants.url_user_profiles}/${_id}`,
                profileData,
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

export const deleteUserProfile = createAsyncThunk(
    'userProfile/deleteUserProfile',
    async ({ _id, token }, { rejectWithValue }) => {
        
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        try {
            await axios.delete(`${Constants.url_user_profiles}/${_id}`, config);
            

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