import { createSlice } from '@reduxjs/toolkit';


// actions
import {
    addNotification,
    getNotifications,
    readNotifications
} from './notificationActions';



const initialState = {
    loading: false,
    notification: null,
    error:null
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        resetNotification:()=>initialState
    },
    extraReducers: {
        // add notification
        [addNotification.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [addNotification.fulfilled]: (state) => {
            state.loading = false
            state.error = false
        },
        [addNotification.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        // get notifications
        [getNotifications.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getNotifications.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.notification = payload
            state.error = false
        },
        [getNotifications.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        // read notifications
        [readNotifications.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [readNotifications.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.notification = payload
            state.error = false
        },
        [readNotifications.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        
    }

})

export const { resetNotification } = notificationSlice.actions;
export default notificationSlice.reducer
