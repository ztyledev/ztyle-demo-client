import React, { Fragment, useEffect, useContext } from "react";
import { Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';



// components
import { ThemeContext } from "../../../context/ThemeContext";
import PageTitle from "../../../components/PageTitle";
import swal from "sweetalert";
import LoadingScreen from '../../../components/LoadingScreen';

// data
import { monthdata } from '../../../data/monthdata';


// actions
import { getPaymentByBookingId } from '../../../store/payment/paymentActions';
import { resetPayment } from '../../../store/payment/paymentSlice';


const PaymentByBookingId = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    

    // redux states
    const { token } = useSelector(state => state.auth);
   
  
    const { 
        changeSideBarStyle
    } = useContext(ThemeContext);
    useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
	},[]);

    useEffect(() => {
        dispatch(getPaymentByBookingId({ id, token }))
    }, [dispatch, id, token]);


    const {loadingPayment, currentPayment, errorPayment } = useSelector(state => state.payment);
    
    

    // display error

    useEffect(() => {
        if (errorPayment) {
			swal(errorPayment, "error");
		}
    }, [errorPayment]);

    // reset state on exit
      useEffect(() => {
        return () => dispatch(resetPayment())
        
      }, [dispatch]);
    
    if (loadingPayment) {
		return(
		<div>
			<LoadingScreen/>
			</div>
		)

	}
    
    else if (currentPayment) {
        // manage date
        const dopay = currentPayment.createdAt;
        const dateOfPay=new Date(dopay);
		const dopayDay = dateOfPay.getDate();
		const dopayMonth = dateOfPay.getMonth();
        const dopayYear = dateOfPay.getFullYear();
        
      


        return (
            <Fragment>
                <PageTitle activeMenu="Details" motherMenu="Payment" />
                <div className="center-60">
                    <Card>                       
                        <Card.Header className="d-block">
                            <Card.Title className="text-center mb-4">
                                <h2 className="text-secondary"> Service Payment</h2>
                                <p className="text-info text-center">Booking Id :{ currentPayment.bookingId}</p>
                            </Card.Title> 
                        </Card.Header>
                        <div className="card-body">                           
                            <div className="profile-about-me">  
                                <h3 className="text-info">Your Payment Details</h3>
                                <div className="pt-4 border-bottom-1 pb-3">
                                   
                                    <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
                                        <div className="col-6">
                                            <h4 className="f-w-500"> Date Of Payment<span className="pull-right">:</span></h4>
                                        </div>
                                        <div className="col-6">
                                           <h4 className="text-secondary"><span> {dopayDay}-{monthdata[dopayMonth]}-{dopayYear} </span></h4> 
                                        </div>
                                    </div>
                                    <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>                                      
                                        <div className="col-6">
                                            <h4 className="f-w-500"> Payment Id<span className="pull-right">:</span></h4>
                                        </div>
                                        <div className="col-6">
                                           <h4 className="text-secondary"><span> {currentPayment.paymentId} </span></h4> 
                                        </div>
                                    </div>
                                     <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>                                      
                                        <div className="col-6">
                                            <h4 className="f-w-500"> Order Id<span className="pull-right">:</span></h4>
                                        </div>
                                        <div className="col-6">
                                           <h4 className="text-secondary"><span> {currentPayment.orderId} </span></h4> 
                                        </div>
                                    </div>
                                    <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>                                      
                                        <div className="col-6">
                                            <h4 className="f-w-500"> Amount<span className="pull-right">:</span></h4>
                                        </div>
                                        <div className="col-6">
                                            <h4 className="text-secondary"><span> &#8377; {currentPayment.amount} </span></h4>
                                        </div>
                                    </div>
                                </div>
                                
                               
                                <div className="text-center">
                                   
                                           
                                    <Link to={`/`}>
                                        <button type="submit" className="btn btn-info" >
                                            Go To Dashboard
                                        </button>
                    
                                    </Link>
                                                    
                                                   
                                

                                                                                      
                                </div>
                                
                            </div>                          
                        </div>                       
                    </Card>                                                                       
                </div>                
            </Fragment>            
    );
    }
    

 
};



export default  PaymentByBookingId ;