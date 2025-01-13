const baseurl = "http://localhost:5000";
const Constants = {
  appname: "Ztyle",
  baseurl: baseurl,

  // auth
  url_shop_ids: baseurl + '/api/auth/shop-ids',
  url_beautician_login: baseurl + '/api/auth/beautician-login',
  url_beautician_register: baseurl + '/api/auth/beautician-register',
  url_beautician_forgot_password: baseurl + '/api/auth/beautician-request-reset-password',
  url_beautician_reset_password: baseurl + '/api/auth/beautician-reset-password',
  url_beautician_account_deactivate: baseurl + '/api/auth/beautician-deactivate-account',
  
  // profile
  url_beautician_profiles: baseurl + '/api/beautician-profile/beautician-profiles',
  url_beautician_profile: baseurl + '/api/beautician-profile/beautician-profiles/my-profile',
  url_beautician_profiles_profile_pic: baseurl + '/api/beautician-profile/beautician-profiles/profile-pic',
  
  // booking
  url_my_bookings: baseurl + '/api/booking/beautician-bookings/my-bookings',
  url_bookings: baseurl + '/api/booking/beautician-bookings',
  
  // payment
  url_payments_by_booking_id: baseurl + '/api/payment/beautician-payments/by-booking',
  
  // notification
  url_notifications: baseurl + '/api/notification/beautician-notifications',
  url_read_notifications: baseurl + '/api/notification/beautician-read-notifications'

};


export default Constants;
