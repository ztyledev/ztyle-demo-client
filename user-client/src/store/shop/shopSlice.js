import { createSlice } from '@reduxjs/toolkit';


// actions
import {
    getShops,
    getShopById
} from './shopActions';


const initialState = {
    loading: false,
    shops: null,
    currentShop: null,
    menu: null,
    selectedMenu:null,
    error:null
}

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        resetShop:()=>initialState
    },
    extraReducers: {
        // get shops
        [getShops.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getShops.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.shops = payload
            state.error = null
        },
        [getShops.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        // get shop by id
        [getShopById.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getShopById.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.currentShop = payload
            state.error = null
        },
        [getShopById.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
    }
    
})

export const { resetShop } = shopSlice.actions;
export default shopSlice.reducer
