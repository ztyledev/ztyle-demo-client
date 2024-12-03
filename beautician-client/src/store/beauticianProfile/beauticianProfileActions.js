import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// config
import Constants from '../../config/constants';

export const getBeauticianProfile = createAsyncThunk(
    'beauticianProfile/getBeauticianProfile',
    async ({ email, token }, { rejectWithValue }) => {
        
        // setting token in header
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
            }
            
        }

        try {
            const profileData = { email };

            const { data } = await axios.post(
                Constants.url_beautician_profile,
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

export const addBasicProfile = createAsyncThunk(
    'beauticianProfile/addBasicProfile',
    async ({ profileData, token }, { rejectWithValue }) => {
        // set up token
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }

        try {
            const { data } = await axios.post(
                Constants.url_beautician_profiles,
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

export const editBeauticianProfile = createAsyncThunk(
    'beauticianProfile/editProfile',
    async ({ profileData, id, token }, { rejectWithValue }) => {
        // set header
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }
        try {
            const { data } = await axios.patch(
                `${Constants.url_beautician_profiles}/${id}`,
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

export const updateProfilePic = createAsyncThunk(
    'beauticianProfile/updateProfilePic',
    async ({ profileData, id, token }, { rejectWithValue }) => {
        // define data as form data
         const customConfig = {
            headers: {
                'authorization': `Bearer ${token}`,
                "Content-type": "multipart/form-data"
            }
        }

        // general header
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }

        try {
            const { data } = await axios.patch(
                `${Constants.url_beautician_profiles_profile_pic}/${id}`,
                profileData,
                customConfig
            )
            if (data) {
                return data;
            }
            else {
                const response = await axios.get(`${Constants.url_beautician_profiles}/${id}`, config);
                response.data.message = data.message;
                return (response.data);
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

export const deleteProfilePic = createAsyncThunk(
    'beauticianProfile/deleteProfilePic',
    async ({ id, token }, { rejectWithValue }) => {
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }
        try {
            const { data } = await axios.delete(
                `${Constants.url_beautician_profiles_profile_pic}/${id}`,
                config
            )

            if (data) {
                return data
            }
            else {
                return null;
            }
            
        }
        catch (err) {
            
        }
    }
    
)

export const deleteBeauticianProfile = createAsyncThunk(
    'beauticianProfile/deleteBeauticianProfile',
    async ({ id, token }, { rejectWithValue }) => {
        // set up header
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }

        try {
            await axios.delete(
                `${Constants.url_beautician_profiles}/${id}`,
                config
            );
            
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