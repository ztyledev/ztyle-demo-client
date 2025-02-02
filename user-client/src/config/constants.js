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
  url_menu_shops: baseurl + '/api/user/menu/shops',
  
  // beautician
  url_beauticians_by_shop_id: baseurl + '/api/user/beauticians/shop-id',
  url_beauticians: baseurl + '/api/user/beauticians',

  // booking
  url_slots: baseurl + '/api/booking/user-slots',
  url_bookings: baseurl + '/api/booking/user-bookings',
  url_my_bookings: baseurl + '/api/booking/user-bookings/my-bookings',

  // payment
  url_service_price: baseurl + '/api/payment/service-price',
  url_order: baseurl + '/api/payment/orders',
  url_verify: baseurl + '/api/payment/verify',
  url_payments_by_booking_id: baseurl + '/api/payment/user-payments/by-booking',
  
  // review
  url_my_shop_review: baseurl + '/api/review/reviews/shop/my-review',
  url_shop_reviews: baseurl + '/api/review/reviews/shop',
  url_shop_reviews_by_user: baseurl + '/api/review/reviews/shop/by-user',
  url_my_beautician_review: baseurl + '/api/review/reviews/beautician/my-review',
  url_beautician_reviews: baseurl + '/api/review/reviews/beautician',
  url_beautician_reviews_by_user: baseurl + '/api/review/reviews/beautician/by-user',
  
  // notification
  url_notifications: baseurl + '/api/notification/user-notifications',
  url_read_notifications: baseurl + '/api/notification/user-read-notifications',
  
};

export default Constants;
