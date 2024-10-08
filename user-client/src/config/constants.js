const baseurl = "http://localhost:5000";
const Constants = {
  appname: "Ztyle",
  baseurl: baseurl,

  // auth
  url_user_login: baseurl + '/api/auth/user-login',
  url_user_register: baseurl + '/api/auth/user-register',
  url_user_forgot_password: baseurl + '/api/auth/user-request-reset-password',
  url_user_reset_password: baseurl + '/api/auth/user-reset-password'

 
};

export default Constants;
