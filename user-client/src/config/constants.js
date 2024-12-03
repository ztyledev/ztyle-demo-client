const baseurl = "http://localhost:5000";
const Constants = {
  appname: "Ztyle",
  baseurl: baseurl,

  // auth
  url_user_login: baseurl + '/api/auth/user-login',
  url_user_register: baseurl + '/api/auth/user-register',
  url_user_forgot_password: baseurl + '/api/auth/user-request-reset-password',
  url_user_reset_password: baseurl + '/api/auth/user-reset-password',
  url_user_account_deactivate: baseurl + '/api/auth/user-deactivate-account',
  
  // profile
  url_user_profile: baseurl + '/api/user-profile/user-profiles/my-profile',
  url_user_profiles:baseurl+'/api/user-profile/user-profiles',

  // shop
  url_shops: baseurl + '/api/user/shops',

  // beautician
  url_beauticians_by_shop_id: baseurl + '/api/user/beauticians/shop-id'
  
};

export default Constants;
