import React, { Fragment, useEffect, useContext, useState } from "react";
import { Card, Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';


// components
import { ThemeContext } from "../../../context/ThemeContext";
import PageTitle from "../../../components/PageTitle";
import swal from "sweetalert";
import LoadingScreen from '../../../components/LoadingScreen';

// data
import { monthdata } from '../../../data/monthdata';

// utils
import { getStandardTime } from '../../../utils/getStandardTime';


// actions
import { resetBooking } from '../../../store/booking/bookingSlice';
import {
    getBookingById,
    changeBookingStatusByBeauticianById
   
} from '../../../store/booking/bookingActions';

import {
    addNotification
} from '../../../store/notification/notificationActions'

const CurrentBooking = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    
    // reset redux state on mount
    useEffect(() => {
        dispatch(resetBooking());
    }, [dispatch]);


    // redux states auth
    const { token } = useSelector(state => state.auth);
   
    // get booking corresponds to id

    useEffect(() => {
        dispatch(getBookingById({ id, token }));
    }, [dispatch, id, token]);
  
    const { 
        changeSideBarStyle
    } = useContext(ThemeContext);
    useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
	},[]);

     
    // redux states for booking
    const { loading, currentBooking, error } = useSelector(state => state.booking)
    
    // states for modals
    const [cancelBookingModal, setcancelBookingModal] = useState(false);
    const [confirmBookingModal, setconfirmBookingModal] = useState(false);


    const handleCancelBooking = () => {
        setcancelBookingModal(false);
        const bookingData = { action: "canceled by beautician" };
         const notification = {
            senderName: currentBooking.beauticianName,
            senderId: currentBooking.beauticianId,
            receiverId: currentBooking.userId,
            message:"Service Booking Canceled"
        }
        dispatch(addNotification({ token, notification }));
        dispatch(changeBookingStatusByBeauticianById({ id: currentBooking._id, bookingData, token }));
    }
    
    const handleConfirmBooking = () => {
        setconfirmBookingModal(false);
        const bookingData = { action: "confirmed" };

        const notification = {
            senderName: currentBooking.beauticianName,
            senderId: currentBooking.beauticianId,
            receiverId: currentBooking.userId,
            message:"Service Booking Confirmed"
        }
        dispatch(addNotification({ token, notification }));
        dispatch(changeBookingStatusByBeauticianById({ id: currentBooking._id, bookingData, token }));
    }


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
			<LoadingScreen/>
			</div>
		)

	}
    
    else if (currentBooking) {
        // manage date
        const dobook = currentBooking.date;
        const dateOfBook=new Date(dobook);
		const dobookDay = dateOfBook.getDate();
		const dobookMonth = dateOfBook.getMonth();
        const dobookYear = dateOfBook.getFullYear();
        
        // manage time
        const stdStart = getStandardTime(currentBooking.slot.start);
        const stdEnd = getStandardTime(currentBooking.slot.end);


        return (
            <Fragment>
                <PageTitle activeMenu="Status" motherMenu="Booking" />
                <div className="center-60">
                    <Card>                       
                        <Card.Header className="d-block">
                            <Card.Title className="text-center mb-4">
                                <h2 className="text-secondary"> Status Of Selected Booking</h2>
                                <p className="text-info text-center">{dobookDay} - {monthdata[dobookMonth]} - {dobookYear}</p>
                            </Card.Title> 
                        </Card.Header>
                        <div className="card-body">                           
                            <div className="profile-about-me">  
                                <h3 className="text-info">Service Booking Details</h3>
                                <div className="pt-4 border-bottom-1 pb-3">
                                   
                                    <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
                                        <div className="col-6">
                                            <h4 className="f-w-500"> Booked Shop<span className="pull-right">:</span></h4>
                                        </div>
                                        <div className="col-6">
                                           <h4 className="text-secondary"><span> {currentBooking.shopName} </span></h4> 
                                        </div>
                                    </div>
                                    <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>                                      
                                        <div className="col-6">
                                            <h4 className="f-w-500"> Selected Service<span className="pull-right">:</span></h4>
                                        </div>
                                        <div className="col-6">
                                           <h4 className="text-secondary"><span> {currentBooking.service} </span></h4> 
                                        </div>
                                    </div>
                                     <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>                                      
                                        <div className="col-6">
                                            <h4 className="f-w-500"> User <span className="pull-right">:</span></h4>
                                        </div>
                                        <div className="col-6">
                                           <h4 className="text-secondary"><span> {currentBooking.userName} </span></h4> 
                                        </div>
                                    </div>
                                    <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>                                      
                                        <div className="col-6">
                                            <h4 className="f-w-500"> Status<span className="pull-right">:</span></h4>
                                        </div>
                                        <div className="col-6">
                                            {
                                                currentBooking.status === "pending" ? // pending
                                                    <h4 className="text-warning"><span>Waiting For Confirmation</span></h4>
                                                    : currentBooking.status === "confirmed" ? // confirmed
                                                        <h4 className="text-info"><span>Booking Confirmed</span></h4>
                                                        : currentBooking.status === "canceled by user" ? // canceled by you
                                                            <h4 className="text-danger"><span>Canceled By You</span></h4>
                                                            : currentBooking.status === "canceled by beautician" ?
                                                                <h4 className="text-danger"><span>Canceled By Beautician</span></h4>
                                                                : currentBooking.status === "completed" ?
                                                                    <h4 className="text-success"><span>Service Completed</span></h4>
                                                                    : ""
                                                                
                                            }
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-about-me">
                                    <h3 className="text-info">Time Slot</h3>
                                    <div className="pt-4 border-bottom-1 pb-3">
                                        <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
                                            <div className="col-6">                                         
                                                <h4 className="f-w-500"> Start<span className="pull-right">:</span></h4>
                                            </div>
                                            <div className="col-6">
                                                <h4 className="text-secondary"><span> {stdStart} </span></h4> 
                                            </div>
                                        </div>
                                        <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
                                            <div className="col-6">                                         
                                                <h4 className="f-w-500"> End<span className="pull-right">:</span></h4>
                                            </div>
                                            <div className="col-6">
                                                <h4 className="text-secondary"><span> {stdEnd} </span></h4> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    {
                                        currentBooking.status === "confirmed" ?
                                            <button type="submit" className="btn btn-secondary">                                                       
                                                Mark As Completed
                                            </button>
                                            : currentBooking.status === "pending" ?
                                                <div>
                                                    <button type="submit" className="btn btn-info mb-1 ms-1" onClick={() => setconfirmBookingModal(true)}>
                                                        <span className="me-2"> <i className="fa fa-thumbs-up" /></span>Confirm Booking 
                                                    </button>                                           
                                                    <button type="submit" className="btn btn-danger mb-1 ms-1" onClick={() => setcancelBookingModal(true)}>                                         
                                                        <span className="me-2"> <i className="fa fa-times" /></span> Cancel Booking                                                  
                                                    </button>                          
                                                </div>
                                                
                                                : currentBooking.status === "completed" ?
                                                    <Link to={`/payments/by-booking/${id}`}>
                                                        <button type="submit" className="btn btn-success" >
                                                            View Payment Details
                                                        </button>
                                
                                                    </Link>                                                                                                                                           
                                                    : ""                                  
                        
                                    }
                                     {/* cancel modal */}
                                    <Modal className="fade" show={cancelBookingModal}>
										<Modal.Header>
                                            <Modal.Title>Are You Sure You want to Cancel Booking</Modal.Title>
											<Button
                                                variant=""
                                                className="btn-close"
                                                onClick={() => setcancelBookingModal(false)}
                                            >                                             
                                            </Button>                                        
                                        </Modal.Header>                                       
										<Modal.Body> Click Cancel if you still want to calncel this booking .. . otherwise click close</Modal.Body>
                                        <Modal.Footer>                                       
                                            <Button                                            
                                                onClick={() => setcancelBookingModal(false)}                                               
                                                variant="primary light"                                           
											>
                                                Close                                               
                                            </Button>                                        
											<Button variant="danger"
                                                onClick={handleCancelBooking}      
											>
												Cancel
											</Button>
										</Modal.Footer>
                                    </Modal>

                                    {/* confirm modal */}
                                     <Modal className="fade" show={confirmBookingModal}>
										<Modal.Header>
                                            <Modal.Title>Are You Sure You want to Confirm This Slot</Modal.Title>
											<Button
                                                variant=""
                                                className="btn-close"
                                                onClick={() => setconfirmBookingModal(false)}
                                            >                                             
                                            </Button>                                        
                                        </Modal.Header>                                       
										<Modal.Body> Click Confirm if you are ready for this slot .. . otherwise click close</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="info"
                                                onClick={handleConfirmBooking}      
											>
												Confirm
											</Button>
                                            <Button                                            
                                                onClick={() => setcancelBookingModal(false)}                                               
                                                variant="danger light"                                           
											>
                                                Close                                               
                                            </Button>                                        
											
										</Modal.Footer>
                                    </Modal> 
                                </div>
                                
                            </div>                          
                        </div>                       
                    </Card>                                                                       
                </div>                
            </Fragment>            
    );
    }
    

 
};



export default  CurrentBooking ;