import { configureStore } from '@reduxjs/toolkit';

// reducers
import authReducer from './auth/authSlice';


const store = configureStore({
    
    reducer: {
        auth:authReducer
    }
})


export default store