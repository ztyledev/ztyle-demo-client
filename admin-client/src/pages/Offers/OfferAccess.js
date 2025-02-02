import React, { useEffect, useContext } from 'react';
import {Row,Card,Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';


// components
import { ThemeContext } from "../../context/ThemeContext";

// action
import { resetShop } from '../../store/shop/shopSlice';


const OfferAccess = () => {
    const dispatch = useDispatch();


    const { 
		changeSideBarStyle
	} = useContext(ThemeContext);
	useEffect(() => {
		
		changeSideBarStyle({ value: "modern", label: "Modern" });
	},[]);

    useEffect(() => {
        dispatch(resetShop());

    }, [dispatch]);
    

    return (
        <div className="container h-100">
            <div className="row justify-content-center h-100 align-items-center">
                <Row>
                    <Card>
                        <Card.Header className="d-block">
                            <Card.Title>Actions Associated With Offer</Card.Title>
                            <p className="mb-0 subtitle">
                                here you can view and add <code>offers</code> and also search offer based on code.
                            </p>
                        </Card.Header>
                        <Card.Body>
                            <Alert
                                variant="secondary"
                                className="alert-dismissible solid fade show"
                            >
                                <strong> View Offers</strong>{" "} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                
                                <Link style={{color:"white"}} to="/offers">
                                    click here to view all offers which are active or inactive
                                </Link>
                                            
                            </Alert>
                        </Card.Body>
                         <Card.Body>
                            <Alert
                                variant="primary"
                                className="alert-dismissible solid fade show"
                            >
                                <strong> Add Offer</strong>{" "} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                
                                <Link style={{color:"white"}} to="/form-add-offer">
                                    click here to add an offer which will be activated immediately. 
                                </Link>
                                            
                            </Alert>
                        </Card.Body>
                        <Card.Body>
                            <Alert
                                variant="success"
                                className="alert-dismissible solid fade show"
                            >
                                <strong> Search Offer</strong>{" "} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                
                                <Link style={{color:"white"}} to="/offer-offer-code">
                                    click here to get an offer by entering offer code.
                                </Link>
                                            
                            </Alert>
                        </Card.Body>
                    </Card>
                </Row>
            </div>
        </div>
  )
}

export default OfferAccess