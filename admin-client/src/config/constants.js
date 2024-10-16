const baseurl = "http://localhost:5000";
const Constants = {
  appname: "Ztyle",
  baseurl: baseurl,

  // auth
  url_admin_login: baseurl + "/api/auth/admin-login",
  url_admin_register: baseurl + "/api/auth/admin-register",
  url_admin_forgot_password: baseurl + '/api/auth/admin-request-reset-password',
  url_admin_reset_password: baseurl + '/api/auth/admin-reset-password',
  
  // shop
  url_shops: baseurl + '/api/admin/shops',
  url_shops_shop_image: baseurl + '/api/admin/shops/shop-image',
  url_shops_image1: baseurl + '/api/admin/shops/image1',
  url_shops_image2: baseurl + '/api/admin/shops/image2'
  
};

export default Constants;
