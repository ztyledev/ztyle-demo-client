import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// config
import Constants from '../../config/constants';

export const getBeauticiansByShopId = createAsyncThunk(
    'beauticians/getBeauticiansByShopId',
    async ({ searchData, token },{rejectWithValue}) => {
        // set header
         const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.post(
                Constants.url_beauticians_by_shop_id,
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