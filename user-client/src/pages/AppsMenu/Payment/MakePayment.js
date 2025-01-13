import React, { Fragment, useEffect, useContext } from "react";
import { Card, } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

// components
import { ThemeContext } from "../../../context/ThemeContext";
import PageTitle from "../../../components/PageTitle";
import swal from "sweetalert";
import LoadingScreen from '../../../components/LoadingScreen';

// data
import { monthdata } from '../../../data/monthdata';

// images
import logo from '../../../images/logo.png';


// config
import Constants from "../../../config/constants";


// actions
import { getBookingById } from '../../../store/booking/bookingActions';
import { changeBookingStatusByUserById } from '../../../store/booking/bookingActions';


import {
    addNotification
} from '../../../store/notification/notificationActions'

const MakePayment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    
    // auth redux states
    const { token } = useSelector(state => state.auth);
    
    // get booking corresponds to id
        useEffect(() => {
            dispatch(getBookingById({ id, token }));
        }, [dispatch, id, token]);
    
     // redux states for booking
    const { loading, currentBooking, error } = useSelector(state => state.booking)
    

    const { 
        changeSideBarStyle
    } = useContext(ThemeContext);
    useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
	},[]);

     
    // payment redux states
    const { paymentDetails, errorPayment } = useSelector(state => state.payment);
    
    const initPayment = (data) => {
    
    const options = {
      key: "rzp_test_jVobFDRadQ7ruh",
      amount: data.amount,
      currency: data.currency,
      name: "Ztyle",
      description: "Test mode",
      image: logo,
      order_id: data.id,
      handler: async (response) => {
        try {
            response.userId = currentBooking.userId;
            response.bookingId = currentBooking._id;
            response.amount = paymentDetails.amount;
            response.currency = "INR";
            response.paymentMethod = "online"
            

          const verifyUrl = Constants.url_verify;
          const { data } = await axios.post(verifyUrl, response);
            console.log(data)
            const notification = {
            senderName: currentBooking.userName,
            senderId: currentBooking.userId,
            receiverId: currentBooking.beauticianId,
            message:"Payment Received"
            }

            const bookingData = { action: "completed" };
            
            dispatch(changeBookingStatusByUserById({ id: currentBooking._id, bookingData, token }))
            dispatch(addNotification({ notification, token }))

            navigate('/payment-success-next')

        }
        catch (err) {
          console.log(err)
        }
      }
    }

    const rzp1 = new window.Razorpay(options);
    rzp1.open();


  }
  const handlePayment = async () => {
    try {
      const orderUrl = Constants.url_order;
      const { data } = await axios.post(orderUrl, paymentDetails)
  
      console.log(data)
      initPayment(data);
      

    }
      
    catch (err) {
        console.log(err)  
      }
    }
    


    // display error
	
    useEffect(() => {
        if (error) {
			swal(error, "error");
		}
    }, [error]);
    
    useEffect(() => {
        if (errorPayment) {
			swal(errorPayment, "error");
		}
    }, [errorPayment]);


    
    if (loading) {
		return(
		<div>
			<LoadingScreen/>
			</div>
		)

	}
    
    else if (paymentDetails && currentBooking) {
        // manage date
        const date=new Date();
		const day = date.getDate();
		const month = date.getMonth();
        const year = date.getFullYear();
        

        return (
            <Fragment>
                <PageTitle activeMenu="Status" motherMenu="Booking" />
                <div className="center-60">
                    <Card>                       
                        <Card.Header className="d-block">
                            <Card.Title className="text-center mb-4">
                                <h2 className="text-secondary"> Please Feel Free To Make Payement</h2>
                                <p className="text-info text-center">{day} - {monthdata[month]} - {year}</p>
                            </Card.Title> 
                        </Card.Header>
                        <div className="card-body">                           
                            <div className="profile-about-me">  
                                <h3 className="text-info">Your Payment Details</h3>
                                <div className="pt-4 border-bottom-1 pb-3">
                                   
                                    <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
                                        <div className="col-6">
                                            <h4 className="f-w-500"> Purpose Of Payment<span className="pull-right">:</span></h4>
                                        </div>
                                        <div className="col-6">
                                           <h4 className="text-secondary"><span> Service Booking </span></h4> 
                                        </div>
                                    </div>
                                    <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>                                      
                                        <div className="col-6">
                                            <h4 className="f-w-500"> Amout<span className="pull-right">:</span></h4>
                                        </div>
                                        <div className="col-6">
                                           <h4 className="text-secondary"><span> &#8377; {paymentDetails.splitAmount} </span></h4> 
                                        </div>
                                    </div>
                                     <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>                                      
                                        <div className="col-6">
                                            <h4 className="f-w-500"> Service Charge<span className="pull-right">:</span></h4>
                                        </div>
                                        <div className="col-6">
                                           <h4 className="text-secondary"><span> &#8377; {paymentDetails.amount-paymentDetails.splitAmount} </span></h4> 
                                        </div>
                                    </div>
                                    <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>                                      
                                        <div className="col-6">
                                            <h3 className="f-w-500"> Total<span className="pull-right">:</span></h3>
                                        </div>
                                        <div className="col-6">
                                           <h3 className="text-secondary"><span> &#8377; {paymentDetails.amount} </span></h3> 
                                        </div>
                                    </div>
                                   
                                </div>
                                
                                
                                <div className="text-center">                                                                       
                                    <button type="submit" className="btn btn-success" onClick={handlePayment}>                                                       
                                        Pay Now
                                    </button>                                                                                                                                                                                                                                 
                                </div>
                                
                            </div>                          
                        </div>                       
                    </Card>                                                                       
                </div>                
            </Fragment>            
    );
    }
    

 
};



export default  MakePayment ;