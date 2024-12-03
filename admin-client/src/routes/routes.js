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


/// shops
import PendingSelect from '../pages/Shops/ShopList/PendingSelect';
import ShopSelect from '../pages/Shops/ShopList/ShopSelect';
import ShopsPendingState from '../pages/Shops/ShopList/ShopsPendingState';
import ShopsPendingDistrict from '../pages/Shops/ShopList/ShopsPendingDistrict';
import ShopsState from '../pages/Shops/ShopList/ShopsState';
import ShopsDistrict from '../pages/Shops/ShopList/ShopsDistrict';
import ShopsShopId from '../pages/Shops/ShopList/ShopsShopId';
import ShopDetail from '../pages/Shops/ShopDetail';

/// admins
import PendingAdmins from '../pages/Admins/PendingAdmins';
import AllAdmins from '../pages/Admins/AllAdmins';
import AdminDetail from '../pages/Admins/AdminDetail';

/// beauticiann
import BeauticiansByShopId from '../pages/Beauticians/BeauticianList/BeauticiansByShopId';
import BeauticianDetail from '../pages/Beauticians/BeauticianDetail';

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
    { path: 'shops-pending-select', element: PendingSelect },
    { path: 'state-shops-pending', element: ShopsPendingState },
    { path: 'district-shops-pending', element: ShopsPendingDistrict },
    { path: 'shop-select', element: ShopSelect },
    { path: 'shops-state', element: ShopsState },
    { path: 'shops-district', element: ShopsDistrict },
    { path: 'shops-shop-id', element: ShopsShopId },
    { path: 'shop-detail/:id', element: ShopDetail },

    /// admins
    { path: 'admins-pending', element: PendingAdmins },
    { path: 'admins-all', element: AllAdmins },
    { path: 'admin-detail/:id', element: AdminDetail },

    /// beauticians
    { path: 'beauticians-by-shop-id/:id', element: BeauticiansByShopId },
    { path: 'beautician-detail/:id', element: BeauticianDetail },
    
   

    /// test

    { path: 'test-testpage', element: TestPage }
    
    
]

export { publicRoutes, authProtectedRoutes }

