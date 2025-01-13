import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { Card, Alert } from 'react-bootstrap';

// actions 
import { resetBooking } from '../../../store/booking/bookingSlice';
import { resetPayment} from '../../../store/payment/paymentSlice';

function PaymentSuccessNext() {
  const dispatch = useDispatch();


  // reset state on exit
        useEffect(() => {
          return () => {
            dispatch(resetBooking())
            dispatch(resetPayment())
          }
          
        }, [dispatch]);
  
   
  return (
    
                  <div className="center-60">
                    <div className="auth-form">
                    <div className="text-center mb-3">
                      <Link to="/dashboard">
                        <svg width="250" height="100" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="myGradient">
                              <stop offset="0%" stop-color="black" />
                              <stop offset="100%" stop-color="grey" />
                            </linearGradient>
                          </defs>
                          <text x="50" y="50" font-size="60" font-weight="bold" fill="url(#myGradient)">ztyle</text>
                        </svg>

                      </Link>
                    </div>
                    <h4 className="text-center mb-4 ">Payment Success</h4>

                    <Card>
                      <Card.Body>
                        <Alert
                          variant="secondary"
                          className="solid alert-dismissible fade show"

                        >
                          <Link to="/" style={{"textDecoration":"none","color":"white"}}>
                            <strong> Payment is successful  </strong> . please click here to dashboard
                          </Link>
                          
                        </Alert>
                        
                      </Card.Body>                     
                    </Card>
                      
                    
                    
                      <div className="new-account mt-3">
                        <p className="">
                          Please Click{" "}
                          <Link className="text-primary" to="/">
                            Home
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
               
  );
};



export default PaymentSuccessNext;