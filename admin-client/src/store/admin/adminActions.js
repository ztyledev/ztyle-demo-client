import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// config
import Constants from '../../config/constants';

export const getAdmins = createAsyncThunk(
    'admins/allAdmins',
    async ({ token }, { rejectWithValue }) => {
         const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.get(Constants.url_admins, config);
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
    'admins/getAdminById',
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

export const activateAdminById = createAsyncThunk(
    'admins/activateAdminById',
    async ({ adminData, id, token }, { rejectWithValue }) => {
        // token in header
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }
        try {
            const { data } = await axios.patch(
                `${Constants.url_admins_activate}/${id}`,
                adminData,
                config
            )
            if (data) {
                return data;
            }
            else {
                return null;
            }

        }
        catch(err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)

export const deactivateAdminById = createAsyncThunk(
    'admins/deactivateAdminById',
    async ({ adminData, id, token }, { rejectWithValue }) => {
        // token in header
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }
        try {
            const { data } = await axios.patch(
                `${Constants.url_admins_deactivate}/${id}`,
                adminData,
                config
            )
            if (data) {
                return data;
            }
            else {
                return null;
            }

        }
        catch(err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)

export const rejectAdminById = createAsyncThunk(
    'admins/rejectAdminById',
    async ({ adminData, id, token }, { rejectWithValue }) => {
        // token in header
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }
        try {
            const { data } = await axios.patch(
                `${Constants.url_admins_reject}/${id}`,
                adminData,
                config
            )
            if (data) {
                return data;
            }
            else {
                return null;
            }

        }
        catch(err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)

export const deleteAdminById = createAsyncThunk(
    'admins/deleteAdminById',
    async ({ adminData, id, token }, { rejectWithValue }) => {
        // token in header
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }
        try {
            const { data } = await axios.patch(
                `${Constants.url_admins_delete}/${id}`,
                adminData,
                config
            )
            if (data) {
                return data;
            }
            else {
                return null;
            }

        }
        catch(err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)