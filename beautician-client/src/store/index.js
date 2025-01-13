import { configureStore } from '@reduxjs/toolkit';

// reducers
import authReducer from './auth/authSlice';
import beauticianProfileReducer from './beauticianProfile/beauticianProfileSlice';
import bookingReducer from './booking/bookingSlice';
import paymentReducer from './payment/paymentSlice';
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
    beauticianProfile: beauticianProfileReducer,
    booking: bookingReducer,
    payment: paymentReducer,
    notification: notificationReducer
      
  },
    
  preloadedState: reHydrateStore(),
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([localStorageMiddleware])

})


export default store