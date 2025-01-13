import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';


// components
import swal from "sweetalert";

// actions
import {
   addBookingByUser
} from '../store/booking/bookingActions';
import {
   addNotification
} from '../store/notification/notificationActions';

// utils
import { getStandardTime} from '../utils/getStandardTime';


const SingleSlot = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
   // states for modals
   
    const {
        start,
       end,
       status
    } = props.item;
    
   const stdStart = getStandardTime(start);
   const stdEnd = getStandardTime(end);
   
   const [basicModal, setBasicModal] = useState(false);


    // redux states
   const { token, userInfo } = useSelector(state => state.auth);
   const { currentShop, selectedMenu } = useSelector(state => state.shop);
   const { currentBeautician } = useSelector(state => state.beautician);
   const { slotDetails,currentBooking,error } = useSelector(state => state.booking);


    const handleBookNow = () => {
        
       setBasicModal(false);
      
       const newBooking = {
          userId: userInfo._id,
          beauticianId: currentBeautician._id,
          shopId: currentShop.shopId,
          date: slotDetails.date,
          slot: props.item,
          service:selectedMenu.name
       }
       
       const notification = {
            senderName: userInfo.fullName,
            senderId: userInfo._id,
            receiverId: currentBeautician._id,
            message:"Service Booking Requested"
         }
       dispatch(addNotification({ token, notification }));
       dispatch(addBookingByUser({ newBooking, token }));

        
    }
   
   // display error
    useEffect(() => {
        if (error) {
            swal(error, "error");

        }
    }, [error]);
   
   // navigate to current booking
   useEffect(() => {
      if (currentBooking && !error) {
         navigate(`/current-booking/${currentBooking._id}`);
      }
   }, [currentBooking, error, navigate]);
 
  
   return (
      <div className="col-lg-12 col-xl-3">
        
         <div className="card">
            <div className="card-body">
               <div className="row m-b-30 text-center">
                  <div className="col-md-5 col-xxl-12">
                     <div className="new-arrival-product mb-4 mb-xxl-4 mb-md-0">
    
                     </div>
                  </div>
                  <div className="col-md-3 col-xxl-12">
                     <div className="new-arrival-content position-relative text-center">
                        
                        <h3 className="text-secondary">
                        Time Slot 
                              
                          
                        </h3>
                        <h4>   Start: &nbsp;  {stdStart}</h4>
                        <h4>   End: &nbsp;  {stdEnd}</h4>
                        {
                           status === "pending" ? // if slot is not booked
                              <button type="submit" className="btn btn-secondary mb-1 ms-1" onClick={() => setBasicModal(true)} >
                                 <span className="me-2"> <i className="fa fa-thumbs-up" /></span> Book Now
                              </button>
                              : status === "confirmed"?
                                 <button type="submit" className="btn btn-danger mb-1 ms-1" disabled >
                                    <span className="me-2"></span> Already Booked
                                 </button>
                                 : status === "canceled" ? // if any user canceled the previous booked slot
                                    <button type="submit" className="btn btn-secondary mb-1 ms-1" onClick={() => setBasicModal(true)} >
                                       <span className="me-2"> <i className="fa fa-thumbs-up" /></span> Book Now
                                    </button>
                                    : ""      
                        }
                        <Modal className="fade" show={basicModal}>                       
                           <Modal.Header>                         
                              <Modal.Title>Book The Slot </Modal.Title>                          
                              <Button                           
											variant=""
											className="btn-close"
											onClick={() => setBasicModal(false)}
                              >                          											
                              </Button>                             
                           </Modal.Header>                       
                           <Modal.Body> Click Book if you still want to book this slot .. . otherwise click cancel</Modal.Body>                        
                           <Modal.Footer>                             
                              <Button                                
											onClick={() => setBasicModal(false)}
											variant="primary light"
                              >                              
											Cancel
                              </Button>                             
                              <Button variant="secondary"                     
                                 onClick={handleBookNow}                             
                              >                                
                                 Book                           
                              </Button>                          
                           </Modal.Footer>                   
                        </Modal>               
                                                                                       	                                     
                     </div>
                  </div>
               </div>
            </div>
         </div>
       
      </div>
   );
};

export default SingleSlot;