import React, { useEffect, useContext } from 'react';
import {Row,Card,Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';


// components
import { ThemeContext } from "../../../context/ThemeContext";

// action
import { resetShop } from '../../../store/shop/shopSlice';


const ShopSelect = () => {
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
                            <Card.Title>The Criteria For Selection</Card.Title>
                            <p className="mb-0 subtitle">
                                here you can select <code>shops </code> as a statewise or districtwise list.
                            </p>
                        </Card.Header>
                        <Card.Body>
                            <Alert
                                variant="secondary"
                                className="alert-dismissible solid fade show"
                            >
                                <strong> Statewise Shops</strong>{" "} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                
                                <Link style={{color:"white"}} to="/shops-state">
                                    click here to get active shops by selecting a specific state
                                </Link>
                                            
                            </Alert>
                        </Card.Body>
                         <Card.Body>
                            <Alert
                                variant="primary"
                                className="alert-dismissible solid fade show"
                            >
                                <strong> Districtwise Shops</strong>{" "} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                
                                <Link style={{color:"white"}} to="/shops-district">
                                    click here to get Active shops by selecting a district in a specific state
                                </Link>
                                            
                            </Alert>
                        </Card.Body>
                        <Card.Body>
                            <Alert
                                variant="success"
                                className="alert-dismissible solid fade show"
                            >
                                <strong> Search Shop</strong>{" "} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                
                                <Link style={{color:"white"}} to="/shops-shop-id">
                                    click here to get a shop by entering Shop Id
                                </Link>
                                            
                            </Alert>
                        </Card.Body>
                    </Card>
                </Row>
            </div>
        </div>
  )
}

export default ShopSelect