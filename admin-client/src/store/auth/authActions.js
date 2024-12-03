import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// configs
import Constants from '../../config/constants';

// setting header in http request
const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
}

export const adminLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            
            const { data } = await axios.post(
                Constants.url_admin_login,
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

export const adminRegister = createAsyncThunk(
    'auth/register',
    async ({ fullName,designation,mobile, email, password }, { rejectWithValue }) => {
        
        try {
            await axios.post(
                Constants.url_admin_register,
                { fullName, designation, mobile, email, password },
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
                Constants.url_admin_forgot_password,
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
                Constants.url_admin_reset_password,
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

export const deactivateAccount = createAsyncThunk(
    'account/deactivateAccount',
    async ({ id, token }, { rejectWithValue }) => {
        
        // set header
         const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }

        try {
            await axios.delete(
                `${Constants.url_admin_account_deactivate}/${id}`,
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