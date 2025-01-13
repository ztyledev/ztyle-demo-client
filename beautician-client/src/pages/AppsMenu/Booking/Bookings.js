import React, { Fragment,useEffect,useContext } from "react";
import {useSelector,useDispatch} from 'react-redux'

// components
import { ThemeContext } from "../../../context/ThemeContext";
import PageTitle from "../../../components/PageTitle";
import swal from "sweetalert";
import SingleBookingList from '../../../components/SingleBookingList';
import LoadingScreen from "../../../components/LoadingScreen";



// actions
import { getBeauticianProfile } from '../../../store/beauticianProfile/beauticianProfileActions';
import { getBookingsByBeautician } from '../../../store/booking/bookingActions';

import { resetBooking } from '../../../store/booking/bookingSlice';

const Bookings = () => {

  const dispatch = useDispatch();
  
  // auth redux states
  const { email, token } = useSelector(state => state.auth.beauticianInfo);
  
  useEffect(() => {
    dispatch(getBeauticianProfile({ email, token }));

  }, [dispatch, email, token]);

  // beautician profile redux state
  const { beauticianProfile } = useSelector(state => state.beauticianProfile);
 
  // api call bookings
  useEffect(() => {
    if (beauticianProfile) {
      const searchData = { beauticianId: beauticianProfile._id };

      dispatch(getBookingsByBeautician({ searchData, token }));
    }
  }, [beauticianProfile, dispatch, token]);


  // booking redux states 
  const { loading, bookings, error } = useSelector(state => state.booking);
    
  const {
    changeSideBarStyle
  } = useContext(ThemeContext);
  useEffect(() => {
    changeSideBarStyle({ value: "modern", label: "Modern" });
  }, []);
  

    
    

    // display error
  useEffect(() => {
    if (error) {
      swal(error, "error");

    }
  }, [error]);

  // reset state on exit
  useEffect(() => {
    return () => dispatch(resetBooking())
    
  }, [dispatch]);


   if (loading) { 
    return(
      <div>
        <LoadingScreen />
      </div>
      
		)
  }
   else if (bookings) {  
  
    return (
      <Fragment>
        <PageTitle activeMenu="All Bookings" motherMenu=" Service" />

          <div className="row">
                {
                    bookings ? bookings.map((booking) => <SingleBookingList key={booking._id} booking={booking} />) :
                        <div className="text-danger text-center ">
                            You don't have any bookings now. Please wait a while for service request.            
                        </div>
                }
            </div>
      </Fragment>
    );
  }
 
};



export default  Bookings ;