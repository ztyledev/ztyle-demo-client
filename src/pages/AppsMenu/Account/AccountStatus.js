import React, { Fragment, useState, useEffect, useContext } from "react";
import { Row, Card, Col, Alert ,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";


import { ThemeContext } from "../../../context/ThemeContext";
import PageTitle from "../../../components/PageTitle";

import { monthdata } from "../../../data/monthdata";


const AccountStatus = () => {
  

  
  const [userProfile, setuserProfile] = useState({});

  const [paymentDetails, setpaymentDetails] = useState({});
  const [payDay, setpayDay] = useState("");
  const [payMonth, setpayMonth] = useState("");
  const [payYear, setpayYear] = useState("");

  
  // const userDetails= JSON.parse( localStorage.getItem('userDetails'));
  // const token=userDetails.token;
  // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

   
    
  const { 
		
		changeSideBarStyle
		
	} = useContext(ThemeContext);
	useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
		
	},[]);

  const [reviewModal, setReviewModal] = useState(false);
 
  
    if (1) {
        
    
        return (
            <Fragment>
            <PageTitle activeMenu="Account Status" motherMenu="Account" />
            <div className="row m-1">
              <div className="col-xl-5 col-xxl-5 m-1">

                <Row>
                    <Card>
                        <Card.Header className="d-block">
                                  <Card.Title className="text-info text-center mb-4"> Payment Information</Card.Title>
                                  
                        </Card.Header>
                        <Card.Body>
                            <div className="profile-about-me">
                                <div className="pt-4 border-bottom-1 pb-3">
                                    {/* <h4 className="text-info mb-4">
                                        Payment Information
                                        
                                    </h4> */}
                                    <div className="row mb-2">
                                        <div className="col-6">
                                            <h5 className="f-w-500"> Amount<span className="pull-right">:</span></h5>
                                        </div>
                                        <div className="col-6">
                                            <span> &#x20b9; 500 </span>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-6">
										    <h5 className="f-w-500"> Order Id<span className="pull-right">:</span></h5>
                                        </div>
                                        <div className="col-6">
                                            <span> {'orderId'} </span>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-6">
										    <h5 className="f-w-500"> Payment Id<span className="pull-right">:</span></h5>
                                        </div>
                                        <div className="col-6">
                                            <span> {'paymentId'} </span>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-6">
										    <h5 className="f-w-500"> Payment Date <span className="pull-right">:</span></h5>
                                        </div>
                                        <div className="col-6">
                                            <span>{'12'} - {'05'} - {'2004'}</span>
                                        </div>
                                    </div>
                                    
                                </div>

                            </div>

                        </Card.Body>
                      
                    </Card>
                </Row>
                    
                        
              </div>
              <div className="col-xl-5 col-xxl-5 m-1">
                <Row>
                  <Card>
                    <Card.Header className="d-block">
                      <Card.Title className="text-info text-center mb-4"> Account Information</Card.Title>
                    </Card.Header>
                    
                      <Card.Body>
                            <div className="profile-about-me">
                                <div className="pt-4 border-bottom-1 pb-3">
                                    {/* <h4 className="text-info mb-4">
                                        Payment Information
                                        
                                    </h4> */}
                                    <div className="row mb-2">
                                        <div className="col-6">
                                            <h5 className="f-w-500"> Status<span className="pull-right">:</span></h5>
                                        </div>
                                        <div className="col-6">
                                            <span> Activated </span>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-6">
										    <h5 className="f-w-500"> Account Type<span className="pull-right">:</span></h5>
                                        </div>
                                        <div className="col-6">
                                            <span> {'premium'} </span>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-6">
										    <h5 className="f-w-500"> Validity<span className="pull-right">:</span></h5>
                                        </div>
                                        <div className="col-6">
                                            <span> {'6 Months'} </span>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-6">
										    <h5 className="f-w-500"> Payment Date <span className="pull-right">:</span></h5>
                                        </div>
                                        <div className="col-6">
                                            <span>{'14'} - {'08'} - {'2004'}</span>
                                        </div>
                                    </div>
                                    
                                </div>

                            </div>

                        </Card.Body>
                                  
                    
                  </Card>
                </Row>
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
                                      variant='danger'
                                      className="solid alert-square"
                                    >
                                      <strong> Account is not activated for this User !!!</strong> please activate now using given link.
                                    </Alert>
                                
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col xl={6} className="col-xxl-12">
                              <Card>
                                <Card.Body>
                                  <Link to="/activate-account"> Click here to activate </Link>
                                </Card.Body>
                              
                              </Card>
                              
                            </Col>
                          </Row>
                        </Fragment>
                      )
    }
};



export default  AccountStatus ;
