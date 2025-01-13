import React, { Fragment, useState ,useEffect,useContext } from "react";
import {useSelector,useDispatch} from 'react-redux'

// components
import { ThemeContext } from "../../../context/ThemeContext";
import PageTitle from "../../../components/PageTitle";
import swal from "sweetalert";
import SingleBookingList from '../../../components/SingleBookingList';
import LoadingScreen from "../../../components/LoadingScreen";



// actions
import {
    getBookingsByUser
} from '../../../store/booking/bookingActions';

import { resetBooking } from '../../../store/booking/bookingSlice';

const Bookings = () => {

    const dispatch = useDispatch();
  
    // redux states
    const { token,userInfo } = useSelector(state => state.auth);
    const { loading, bookings, error } = useSelector(state => state.booking);
    
  
    const { 
        changeSideBarStyle
    } = useContext(ThemeContext);
    useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
	},[]);

    const [reviewModal, setReviewModal] = useState(false);

    // api call bookings
    useEffect(() => {
    
        const userId = userInfo._id;
        const searchData = { userId };
        dispatch(getBookingsByUser({ searchData, token }));
    }, [dispatch, token, userInfo._id]);
    

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
        <PageTitle activeMenu="Bookings" motherMenu=" Service" />

          <div className="row">
                {
                    bookings ? bookings.map((booking) => <SingleBookingList key={booking._id} booking={booking} />) :
                        <div className="text-danger text-center ">
                            You don't have any bookings now. Please feel free to book a beauty service.            
                        </div>
                }
            </div>
      </Fragment>
    );
  }
 
};



export default  Bookings ;