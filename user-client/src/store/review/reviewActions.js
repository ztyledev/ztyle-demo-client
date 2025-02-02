import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import Constants from '../../config/constants';

/// shop section

export const getMyShopReview = createAsyncThunk(
    'review/getMyShopReview',
    async ({ searchData, token }, { rejectWithValue }) => {
        // setting header in token
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }

        }

        try {
            const { data } = await axios.post(
                Constants.url_my_shop_review,
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

export const addShopReview = createAsyncThunk(
    'review/addShopReview',
    async ({ reviewData, token }, { rejectWithValue }) => {
        // setting header in token
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }

        }
        try {
            const { data } = await axios.post(
                Constants.url_shop_reviews,
                reviewData,
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

export const editShopReviewById = createAsyncThunk(
    'review/editReviewById',
    async ({ reviewData, id, token }, { rejectWithValue }) => {
        // setting header in token
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }

        }
        try {
            const { data } = await axios.patch(
                `${Constants.url_shop_reviews}/${id}`,
                reviewData,
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

export const getShopReviews = createAsyncThunk(
    'review/getShopReviews',
    async ({ id, token }, { rejectWithValue }) => {
        
        // setting header in token
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }

        }

        try {
            const { data } = await axios.get(
                `${Constants.url_shop_reviews_by_user}/${id}`,
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

/// beautician section

export const getMyBeauticianReview = createAsyncThunk(
    'review/getMyBeauticianReview',
    async ({ searchData, token }, { rejectWithValue }) => {
        // setting header in token
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }

        }

        try {
            const { data } = await axios.post(
                Constants.url_my_beautician_review,
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

export const addBeauticianReview = createAsyncThunk(
    'review/addBeauticianReview',
    async ({ reviewData, token }, { rejectWithValue }) => {
        // setting header in token
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }

        }
        try {
            const { data } = await axios.post(
                Constants.url_beautician_reviews,
                reviewData,
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

export const editBeauticianReviewById = createAsyncThunk(
    'review/editBeauticianReviewById',
    async ({ reviewData, id, token }, { rejectWithValue }) => {
        // setting header in token
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }

        }
        try {
            const { data } = await axios.patch(
                `${Constants.url_beautician_reviews}/${id}`,
                reviewData,
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

export const getBeauticianReviews = createAsyncThunk(
    'review/getBeauticianReviews',
    async ({ id, token }, { rejectWithValue }) => {
        
        // setting header in token
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }

        }

        try {
            const { data } = await axios.get(
                `${Constants.url_beautician_reviews_by_user}/${id}`,
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