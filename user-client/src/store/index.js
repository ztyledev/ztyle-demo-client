import { configureStore } from '@reduxjs/toolkit';

// reducers
import authReducer from './auth/authSlice';
import userProfileReducer from './userProfile/userProfileSlice';
import shopReducer from './shop/shopSlice';
import beauticianReducer from './beautician/beauticianSlice';
import bookingReducer from './booking/bookingSlice';
import paymentReducer from './payment/paymentSlice';
import reviewReducer from './review/reviewSlice';
import notificationReducer from './notification/notificationSlice';


// middleware localstorage
const localStorageMiddleware = ({ getState }) => {
  return next => action => {
    const result = next(action);
    localStorage.setItem('applicationState', JSON.stringify(getState()));
    return result;
  };
};

const reHydrateStore = () => {
  if (localStorage.getItem('applicationState') !== null) {
    return JSON.parse(localStorage.getItem('applicationState')); // re-hydrate the store
  }
};



const store = configureStore({
    
  reducer: {
    auth: authReducer,
    userProfile: userProfileReducer,
    shop: shopReducer,
    beautician: beauticianReducer,
    booking: bookingReducer,
    payment: paymentReducer,
    review: reviewReducer,
    notification:notificationReducer
    
  },
  preloadedState: reHydrateStore(),
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([localStorageMiddleware])
    
    
})


export default store