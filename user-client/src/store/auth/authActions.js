import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

// configs

import Constants from '../../config/constants';

// setting header in http request
const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
}

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            
            const { data } = await axios.post(
                Constants.url_user_login,
                { email, password },
                config
                 
            )

            return data
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


export const userRegister = createAsyncThunk(
    'auth/register',
    async ({ fullName, email, password }, { rejectWithValue }) => {
        
        try {
            await axios.post(
                Constants.url_user_register,
                { fullName, email, password },
                config
            )
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

export const requestResetPassword = createAsyncThunk(
    'auth/requestResetPassword',
    async ({ email }, { rejectWithValue }) => {
        
        try {
            
            const { data } = await axios.post(
                Constants.url_user_forgot_password,
                { email },
                config
            )

            if (data.message) {
                return data.message
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

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (payload, { rejectWithValue }) => {
        
        try {
            
            const { data } = await axios.post(
                Constants.url_user_reset_password,
                payload,
                config
            )
            if (data) {
                return data;
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