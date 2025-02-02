const baseurl = "http://localhost:5000";
const Constants = {
  appname: "Ztyle",
  baseurl: baseurl,

  // auth
  url_admin_login: baseurl + "/api/auth/admin-login",
  url_admin_register: baseurl + "/api/auth/admin-register",
  url_admin_forgot_password: baseurl + '/api/auth/admin-request-reset-password',
  url_admin_reset_password: baseurl + '/api/auth/admin-reset-password',
  url_admin_account_deactivate: baseurl + '/api/auth/admin-deactivate-account',
  
  // shop
  url_shops: baseurl + '/api/admin/shops',
  url_shops_shop_image: baseurl + '/api/admin/shops/shop-image',
  url_shops_image1: baseurl + '/api/admin/shops/image1',
  url_shops_image2: baseurl + '/api/admin/shops/image2',
  url_shop_certificate: baseurl + '/api/admin/shops/certificate',
  url_shops_pending_state: baseurl + '/api/admin/shops/pending/by-state',
  url_shops_pending_district: baseurl + '/api/admin/shops/pending/by-district',
  url_shops_state: baseurl + '/api/admin/shops/by-state',
  url_shops_district: baseurl + '/api/admin/shops/by-district',
  url_shop_shop_id: baseurl + '/api/admin/shops/my-shop',
  
  // admins
  url_admins:baseurl+'/api/admin/admins',
  url_admins_pending: baseurl + '/api/admin/pending/admins',
  url_admins_activate: baseurl + '/api/admin/admins/activate',
  url_admins_deactivate: baseurl + '/api/admin/admins/deactivate',
  url_admins_reject: baseurl + '/api/admin/admins/reject',
  url_admins_delete: baseurl + '/api/admin/admins/delete',

  // beauticians
  url_beauticians: baseurl + '/api/admin/beauticians',
  url_beauticians_shop_id: baseurl + '/api/admin/beauticians/shop-id',
  
  // offer
  url_offers: baseurl + '/api/offer/offers',
  url_offer_by_code: baseurl + '/api/offer/offers/by-admin',
  
  // review
  url_shop_reviews_by_admin: baseurl + '/api/review/reviews/shop/by-admin',
  url_beautician_reviews_by_admin: baseurl + '/api/review/reviews/beautician/by-admin'

};


export default Constants;
