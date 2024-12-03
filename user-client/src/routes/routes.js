import { Navigate } from 'react-router-dom';

/// pages
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import RegisterSuccessNext from "../pages/RegisterSuccessNext";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from '../pages/ResetPassword';
import PasswordMailsendStatus from '../pages/PasswordMailsendStatus';
import PassordUpdateStatus from '../pages/PasswordUpdateStatus';


// import Error404 from "../pages/Error404";

/// general
import AboutUs from "../pages/AboutUs";
import Services from "../pages/Services";
import Contact from "../pages/Contact";

/// dashboard
import Home from "../pages/Dashboard/Home";

/// forms

import FormProfileAdd from "../pages/Forms/formProfileAdd";
import FormProfileEdit from '../pages/Forms/formProfileEdit';


/// apps menu

import AppProfile from "../pages/AppsMenu/AppProfile/AppProfile";

/// Shops

import ShopList from '../pages/AppsMenu/Shops/ShopList';
import ShopDetail from '../pages/AppsMenu/Shops/ShopDetail';

/// Beauticians

import BeauticiansByShopId from '../pages/AppsMenu/Beauticians/BeauticiansByShopId';

/// account

import AccountStatus from "../pages/AppsMenu/Account/AccountStatus";
import ActivateAccount from "../pages/AppsMenu/Account/ActivateAccount";

/// test pages

import TestPage from "../pages/TestPage";


const publicRoutes = [
    { path: 'page-ztyle', element: LandingPage },
    { path: 'page-login', element: Login },
    { path: 'page-register', element: Registration },
    { path: 'page-register-success-next', element: RegisterSuccessNext },
    { path: 'page-forgot-password', element: ForgotPassword },
    { path: 'page-user-reset-password', element: ResetPassword },
    { path: 'page-password-mailsend-status', element: PasswordMailsendStatus },
    { path: 'page-password-update-status', element: PassordUpdateStatus },
    
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
    { path: 'form-add-profile', element: FormProfileAdd },
    { path: 'form-edit-profile', element: FormProfileEdit },
    
    /// user profile
    { path: 'app-profile', element: AppProfile },

    /// shops
    { path: 'shops', element: ShopList },
    { path: 'shop-detail/:id', element: ShopDetail },

    /// beauticians
    { path: 'beauticians-by-shop-id/:id', element: BeauticiansByShopId },
    
    
    /// account 
    { path: 'activate-account', element: ActivateAccount },
    { path: 'account-status', element: AccountStatus },

    /// test

    { path: 'test-testpage', element: TestPage }
    
    
]

export { publicRoutes, authProtectedRoutes }

