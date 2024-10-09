import React, { Fragment, useState, useEffect, useContext } from "react";
import { Row, Card, Col, Alert ,Button,Modal } from "react-bootstrap";
import { Link ,useHistory } from "react-router-dom";


import { ThemeContext } from "../../../context/ThemeContext";
import PageTitle from "../../../components/PageTitle";

import logo from '../../../images/logo.jpg';

const ActivateAccount = () => {
  
  
  // const userDetails= JSON.parse( localStorage.getItem('userDetails'));
  // const token=userDetails.token;
  // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;


  const [paymentOptions, setpaymentOptions] = useState({});
  const [paymentId, setpaymentId] = useState("");
  const [orderId, setorderId] = useState("");
  const [isPaymentSuccess, setisPaymentSuccess] = useState(false);


  const { 
		
		changeSideBarStyle
		
	} = useContext(ThemeContext);
	useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
	},[]);

  const [basicModal, setbeviewModal] = useState(false);
  const handleScript=(src)=>{
    return new Promise(resolve => {
      const script= document.createElement('script');
      script.src=src;
      
      
      script.onload =()=>{
        resolve(true);
      }
      script.onerror=()=>{
        resolve(false);
      }
      document.body.appendChild(script);
    })
    
  }
  const handleRazorpay = async () => {
    const res = await handleScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('razorpay failed to load');
      return;
    }

    const options = {
      "key": "rzp_test_EcAdh67KBaMQHm", // Enter the Key ID generated from the Dashboard
      "amount": paymentOptions.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": paymentOptions.currency,
      "name": "SRS Matrimony.",
      "description": "Test Transaction",
      "image": logo,
      "order_id": paymentOptions.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response) {
        setpaymentId(response.razorpay_payment_id);
        setorderId(response.razorpay_order_id);
        setisPaymentSuccess(true)
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature)
      },
      "prefill": {
        "name": "Your name",
        "email": "your mail id",
        "contact": "9999999999"
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };
    const paymentObject = new window.Razorpay(options);

    paymentObject.open();
    
  }
  console.log(paymentId, orderId, isPaymentSuccess);

  

    if (1) {
        
    
        return (
          <Fragment>
            
            <PageTitle activeMenu="Activate Account" motherMenu="Account" />
            <div className="container h-100 ">
              <div className="row justify-content-center h-100 align-items-center">
                <div className="col-md-6">
                 
                    <Row>
                        <Card>
                            <Card.Header className="d-block">
                                      <Card.Title className="text-center">Activate Your Account</Card.Title>
                                      
                            </Card.Header>
                            <Card.Body>
                          In order to activate your account , you need to pay &#x20b9; 500
                          
                          <div className="pt-4 border-bottom-1 pb-3">
                          <h4 className="text-primary mb-4 text-center">
                            Payment Details
                  
                          </h4>
                          
                            <div className="row mb-2">
                              <div className="col-4">
                                <h5 className="f-w-500"> Amount<span className="pull-right">:</span></h5>
                              </div>
                              <div className="col-4">
                                <h5 className="f-w-500">  &#x20b9; 500 </h5>
                              </div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-4">
                                <h5 className="f-w-500"> Validity of Premium Account<span className="pull-right">:</span></h5>
                              </div>
                              <div className="col-4">
                                <h5 className="f-w-500">  6 months </h5>
                              </div>
                            </div>
                            
                          </div>
                          
                            </Card.Body>
                      <Card.Body>
                        <div className="text-center">
                          <Button className="xl-5" variant="primary" onClick={handleRazorpay}>
                                   Procced To Pay
                          </Button>
                          
                        </div>
                                
                    </Card.Body>
                            
                        </Card>
                        </Row>
                    
               
                  
                </div>
              </div>
              </div>
            
            
            
                    {/* review */}
        
            </Fragment>
        );
    }
    else {
        return(
                        <Fragment>
                          <PageTitle activeMenu="Activate Account" motherMenu="Account" />
                          
                          <Row>
                          <Col xl={6} className="col-xxl-12">
                              <Card>
                                <Card.Header className="d-block">
                                  <Card.Title>Account Status</Card.Title>
                                  
                                </Card.Header>
                                <Card.Body>
                                  
                                    <Alert
                                      variant='success'
                                      className="solid alert-square"
                                    >
                                      <strong> Account is already activated for this User !!!</strong> no need to activate now.
                                    </Alert>
                                
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col xl={6} className="col-xxl-12">
                              <Card>
                                <Card.Body>
                                  <Link to="/"> Click here to go to dash board </Link>
                                </Card.Body>
                              
                              </Card>
                              
                            </Col>
                          </Row>
                        </Fragment>
                      )
    }
};



export default  ActivateAccount ;
