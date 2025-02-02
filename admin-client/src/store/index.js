import { configureStore } from '@reduxjs/toolkit';

// reducers
import authReducer from './auth/authSlice';
import shopReducer from './shop/shopSlice';
import adminReducer from './admin/adminSlice';
import beauticianReducer from './beautician/beauticianSlice';
import offerReducer from './offer/offerSlice';
import reviewReducer from './review/reviewSlice';



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
    shop: shopReducer,
    admin: adminReducer,
    beautician: beauticianReducer,
    offer: offerReducer,
    review: reviewReducer
  },
  
  preloadedState: reHydrateStore(),
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([localStorageMiddleware])
})


export default store
