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