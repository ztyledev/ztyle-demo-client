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

// general

import AboutUs from '../pages/AboutUs';
import Services from '../pages/Services';
import Contact from "../pages/Contact";


/// dashboard

import Home from "../pages/Dashboard/Home";

/// forms

import FormBasicShopAdd from "../pages/Forms/formBasicShopAdd";
import FormBasicShopEdit from '../pages/Forms/formBasicShopEdit';
import FormAdvanceShopAdd from "../pages/Forms/formAdvanceShopAdd";
import FormAdvanceShopEdit from "../pages/Forms/formAdvanceShopEdit";

/// apps menu
import AppProfile from "../pages/AppsMenu/AppProfile/AppProfile";

/// shops
import ShopDetail from '../pages/Shops/ShopDetail';

/// profiles

import ProfilesMatching from "../pages/AppsMenu/Profiles/ProfileList/ProfilesMatching";
import ProfilesFresh from "../pages/AppsMenu/Profiles/ProfileList/ProfilesFresh";
import ProfilesInterstSent from "../pages/AppsMenu/Profiles/ProfileList/ProfilesInterestSent";
import ProfilesInterestReceived from "../pages/AppsMenu/Profiles/ProfileList/ProfilesInterestReceived";
import ProfilesInterestMutual from "../pages/AppsMenu/Profiles/ProfileList/ProfilesInterestMutual";
import ProfileDetail from "../pages/AppsMenu/Profiles/ProfileDetail";

/// account

import AccountStatus from "../pages/AppsMenu/Account/AccountStatus";
import ActivateAccount from "../pages/AppsMenu/Account/ActivateAccount";

/// test pages

import TestPage from "../pages/TestPage";


const publicRoutes = [
    { path: 'page-ztyle-admin', element: LandingPage },
    { path: 'page-login', element: Login },
    { path: 'page-register', element: Registration },
    { path: 'page-register-success-next', element: RegisterSuccessNext },
    { path: 'page-forgot-password', element: ForgotPassword },
    { path: 'page-admin-reset-password', element: ResetPassword },
    { path: 'page-password-mailsend-status', element: PasswordMailsendStatus },
    { path: 'page-password-update-status', element: PasswordUpdateStatus },
    // { path: '*', element: Error404 }

    // general
    { path: 'page-about-us', element: AboutUs },
    { path: 'page-services', element: Services },
    { path: 'page-contact', element: Contact }
    
    
]

const authProtectedRoutes = [
    /// dashboard
    { path: '/', element: () => <Navigate to='/dashboard' /> },
    { path: 'dashboard', element: Home },
    
    ///form
    { path: 'form-add-basic-shop', element: FormBasicShopAdd },
    { path: 'form-edit-basic-shop/:id', element: FormBasicShopEdit },
    { path: 'form-add-advance-info/:id', element: FormAdvanceShopAdd },
    { path: 'form-edit-advance-info/:id', element: FormAdvanceShopEdit },

    /// shops
    { path: 'shop-detail/:id', element: ShopDetail },
    
    /// user profile
    { path: 'app-profile', element: AppProfile },
    
    /// profiles
    { path: 'profiles-matching', element: ProfilesMatching },
    { path: 'profiles-fresh', element: ProfilesFresh },
    { path: 'profiles-sent-interest', element: ProfilesInterstSent },
    { path: 'profiles-received-interest', element: ProfilesInterestReceived },
    { path: 'profiles-mutual-interest', element: ProfilesInterestMutual },
    { path: 'profile-detail/:id', element: ProfileDetail },
    
    /// account 
    { path: 'activate-account', element: ActivateAccount },
    { path: 'account-status', element: AccountStatus },

    /// test

    { path: 'test-testpage', element: TestPage }
    
    
]

export { publicRoutes, authProtectedRoutes }

