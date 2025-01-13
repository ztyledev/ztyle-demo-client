import { Navigate } from 'react-router-dom';

/// pages

import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import RegisterSuccessNext from "../pages/RegisterSuccessNext";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import PasswordMailsendStatus from "../pages/PasswordMailsendStatus";
import PasswordUpdateStatus from "../pages/PasswordUpdateStatus";
// import Error404 from "../pages/Error404";

//general pages
import AboutUs from "../pages/AboutUs";
import Services from "../pages/Services";
import Contact from "../pages/Contact";

/// dashboard

import Home from "../pages/Dashboard/Home";

/// forms

import FormBasicProfileAdd from "../pages/Forms/formBasicProfileAdd";
import FormBasicProfileEdit from '../pages/Forms/formBasicProfileEdit';
import FormAdvanceProfileAdd from "../pages/Forms/formAdvanceProfileAdd";
import FormAdvanceProfileEdit from "../pages/Forms/formAdvanceProfileEdit";

/// beautician profile
import AppProfile from "../pages/AppsMenu/AppProfile/AppProfile";

// booking
import Bookings from '../pages/AppsMenu/Booking/Bookings';
import CurrentBooking from '../pages/AppsMenu/Booking/CurrentBooking';

// payment
import PaymentByBookingId from '../pages/AppsMenu/Payment/PaymentByBookingId';

/// account

import AccountStatus from "../pages/AppsMenu/Account/AccountStatus";
import ActivateAccount from "../pages/AppsMenu/Account/ActivateAccount";

/// test pages

import TestPage from "../pages/TestPage";


const publicRoutes = [
    { path: 'page-ztyle-beautician', element: LandingPage },
    { path: 'page-login', element: Login },
    { path: 'page-register', element: Registration },
    { path: 'page-register-success-next', element: RegisterSuccessNext },
    { path: 'page-forgot-password', element: ForgotPassword },
    { path: 'page-password-mailsend-status', element: PasswordMailsendStatus },
    { path: 'page-password-update-status', element: PasswordUpdateStatus },
    { path: 'page-beautician-reset-password', element: ResetPassword },
    

    // { path: '*', element: Error404 }
    
    //general pages
    { path: 'page-about-us', element: AboutUs },
    { path: 'page-services', element: Services },
    { path: 'page-contact', element: Contact },
]

const authProtectedRoutes = [
    /// dashboard
    { path: '/', element: () => <Navigate to='/dashboard' /> },
    { path: 'dashboard', element: Home },
    
    ///form
    { path: 'form-add-basic-profile', element: FormBasicProfileAdd },
    { path: 'form-edit-basic-profile', element: FormBasicProfileEdit },
    { path: 'form-add-advance-info', element: FormAdvanceProfileAdd },
    { path: 'form-edit-advance-info', element: FormAdvanceProfileEdit },
    
    /// user profile
    { path: 'app-profile', element: AppProfile },

    /// booking
    { path: 'bookings', element: Bookings },
    { path: 'current-booking/:id', element: CurrentBooking },

    /// payment
    { path: 'payments/by-booking/:id', element: PaymentByBookingId },
    
    /// account 
    { path: 'activate-account', element: ActivateAccount },
    { path: 'account-status', element: AccountStatus },

    /// test

    { path: 'test-testpage', element: TestPage }
    
    
]

export { publicRoutes, authProtectedRoutes }

