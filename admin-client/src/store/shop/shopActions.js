import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// config
import Constants from "../../config/constants";

export const addShop = createAsyncThunk(
    'shop/addShop',
    async ({ shopData, token }, { rejectWithValue }) => {
        // token in header
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }

        try {
            const { data } = await axios.post(
                Constants.url_shops,
                shopData,
                config
            )
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

export const getShopById = createAsyncThunk(
    'shop/getShopById',
    async ({ id, token }, { rejectWithValue }) => {
        // token in header
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

export const editShopById = createAsyncThunk(
    'shop/editShopById',
    async ({ shopData, id, token }, { rejectWithValue }) => {
        
        // token in header
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }

        try {
            const { data } = await axios.patch(
                `${Constants.url_shops}/${id}`,
                shopData,
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

/// files
export const updateShopImage = createAsyncThunk(
    'shop/updateShopImage',
    async ({ shopData, id, token }, { rejectWithValue }) => {
        const customConfig = {
            headers: {
                'authorization': `Bearer ${token}`,
                "Content-type": "multipart/form-data"
            }
        }

        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }

        try {
            const { data } = await axios.patch(
                `${Constants.url_shops_shop_image}/${id}`,
                shopData,
                customConfig
            );

            if (data) {
                return data;
            }
            else {
                const response = await axios.get(`${Constants.url_shops}/${id}`, config);
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

export const deleteShopImage = createAsyncThunk(
    'shop/deleteShopImage',
    async ({ id, token }, { rejectWithValue }) => {
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }

        try {
            const { data } = await axios.delete(`${Constants.url_shops_shop_image}/${id}`, config);
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

export const updateImage1 = createAsyncThunk(
    'shop/updateImage1',
    async ({ shopData, id, token }, { rejectWithValue }) => {
         const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }

        const customConfig = {
            headers: {
                'authorization': `Bearer ${token}`,
                "Content-type": "multipart/form-data"
            }
        }

        try {
            const { data } = await axios.patch(
                `${Constants.url_shops_image1}/${id}`,
                shopData,
                customConfig
            )

            if (data) {
                return data;
            }
            else {
                const response = await axios.get(`${Constants.url_shops}/${id}`, config);
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

export const deleteImage1 = createAsyncThunk(
    'shop/deleteImage1',
    async ({ id, token }, { rejectWithValue }) => {
        
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.delete(`${Constants.url_shops_image1}/${id}`, config);
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

export const updateImage2 = createAsyncThunk(
    'shop/updateImage2',
    async ({ shopData, id, token }, { rejectWithValue }) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        
        try {
            const customConfig = {
                 headers: {
                    'authorization': `Bearer ${token}`,
                     "Content-type": "multipart/form-data"
                }
            }
            

            const { data } = await axios.patch(`${Constants.url_shops_image2}/${id}`, shopData, customConfig);

            if (data) {
                return data;
            }
            else {
                const response = await axios.get(`${Constants.url_shops}/${id}`, config);
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

export const deleteImage2 = createAsyncThunk(
 
    'shop/deleteImage2',
    async ({ id, token }, { rejectWithValue }) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        
        try {

            const { data } = await axios.delete(`${Constants.url_shops_image2}/${id}`, config);
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

export const updateShopCertificate = createAsyncThunk(
    'shop/updateShopCertificate',
    async ({ shopData, id, token }, { rejectWithValue }) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }

        const customConfig = {
            headers: {
                'authorization': `Bearer ${token}`,
                "Content-type": "multipart/form-data"
            }
        }

        try {
            const { data } = await axios.patch(
                `${Constants.url_shop_certificate}/${id}`,
                shopData,
                customConfig
            )

            if (data) {
                return data;
            }
            else {
                const response = await axios.get(`${Constants.url_shops}/${id}`, config);
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

export const deleteShopCertificate = createAsyncThunk(
    'shop/deleteShopCertificate',
    async ({ id, token }, { rejectWithValue }) => {
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }

        try {
            const { data } = await axios.delete(`${Constants.url_shop_certificate}/${id}`, config);
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

// delete entire shop profile
export const deleteCurrentShop = createAsyncThunk (
    
    'shop/deleteCurrentShop',
    async ({ id, token }, { rejectWithValue }) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        
        try {

            const { data } = await axios.delete(`${Constants.url_shops}/${id}`, config);
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


// Shop actions by admin

export const getPendingShopsByState = createAsyncThunk(
    'shops/getPendingShopsBystate',
    async ({ searchData, token }, { rejectWithValue }) => {
         const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.post(
                Constants.url_shops_pending_state,
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

export const getPendingShopsByDistrict = createAsyncThunk(
    'shops/getPendingShopsBydistrict',
    async ({ searchData, token }, { rejectWithValue }) => {
         const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.post(
                Constants.url_shops_pending_district,
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

// status control

export const editShopStatusById = createAsyncThunk(
    'shop/editShopStatusById',
    async ({ shopData, id, token }, { rejectWithValue }) => {
        
        // token in header
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }

        try {
            const { data } = await axios.patch(
                `${Constants.url_shops}/${id}`,
                shopData,
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

export const getActiveShopsByState = createAsyncThunk(
    'shops/getActiveShopsBystate',
    async ({ searchData, token }, { rejectWithValue }) => {
         const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.post(
                Constants.url_shops_state,
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

export const getActiveShopsByDistrict = createAsyncThunk(
    'shops/getActiveShopsByDistrict',
    async ({ searchData, token }, { rejectWithValue }) => {
         const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.post(
                Constants.url_shops_district,
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

export const getActiveShopByShopId = createAsyncThunk(
    'shops/getActiveShopsByShopId',
    async ({ searchData, token }, { rejectWithValue }) => {
         const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.post(
                Constants.url_shop_shop_id,
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