import React, { Fragment, useEffect, useContext,useState } from "react";
import { Card, Button, Modal,Row,Col,Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams,Link } from 'react-router-dom';

// components
import { ThemeContext } from "../../context/ThemeContext";
import PageTitle from "../../components/PageTitle";
import swal from "sweetalert";
import LoadingScreen from '../../components/LoadingScreen';

// data
import { monthdata } from '../../data/monthdata';

// actions
import {
    getOfferById,
    deleteOfferById
} from '../../store/offer/offerActions'

import { resetOffer } from '../../store/offer/offerSlice';


const OfferDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { 
        changeSideBarStyle
      } = useContext(ThemeContext);
      useEffect(() => {
        changeSideBarStyle({ value: "modern", label: "Modern" });
      }, []);
    

    // auth redux state
    const { token } = useSelector(state => state.auth);
    
    useEffect(() => {
        dispatch(getOfferById({ id, token }))
    }, [dispatch, id, token]);

    const { loading, currentOffer, error } = useSelector(state => state.offer);
    
    // field for modals
    const [deleteOfferModal, setdeleteOfferModal] = useState(false);

    const handleDeleteOffer = () => {
        setdeleteOfferModal(false)
        const id = currentOffer._id
        dispatch(deleteOfferById({ id, token }))
        
    }


    // display error
    useEffect(() => {
        if (error) {
            swal(error, "error");
        }
    }, [error]);
    
    // reset state on return
    useEffect(() => {
        return () => dispatch(resetOffer());    
    }, [dispatch]);

    
    
    if (loading) {
        return (
            <div>
                <LoadingScreen />
            </div>
        )
    }
    
    else if (currentOffer) {
        
        /// manage date
        
        // offer start date 
        const dostart = currentOffer.startDate;
        const dateOfStart=new Date(dostart);
		const doStartDay = dateOfStart.getDate();
		const doStartMonth = dateOfStart.getMonth();
        const doStartYear = dateOfStart.getFullYear();

         // offer end date 
        const doend = currentOffer.endDate;
        const dateOfEnd=new Date(doend);
		const doEndDay = dateOfEnd.getDate();
		const doEndMonth = dateOfEnd.getMonth();
        const doEndYear = dateOfEnd.getFullYear();

        return (
            <Fragment>
                <PageTitle activeMenu="Status" motherMenu="Offer" />
                <div className="center-60">
                    <Card>
                        <Card.Header className="d-block">
                            <Card.Title className="text-center mb-4">
                                <h2 className="text-secondary"> Status Of Selected Offer</h2>
                                {/* <p className="text-info text-center">{dobookDay} - {monthdata[dobookMonth]} - {dobookYear}</p> */}
                            </Card.Title>
                        </Card.Header>
                        <div className="card-body">
                            <div className="profile-about-me">
                                <h3 className="text-info">Offer Details</h3>
                                <div className="pt-4 border-bottom-1 pb-3">
                                
                                    <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
                                        <div className="col-6">
                                            <h4 className="f-w-500"> Offer Name<span className="pull-right">:</span></h4>
                                        </div>
                                        <div className="col-6">
                                            <h4 className="text-secondary"><span> {currentOffer.offerName} </span></h4>
                                        </div>
                                    </div>
                                    <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
                                        <div className="col-6">
                                            <h4 className="f-w-500"> Offer Code<span className="pull-right">:</span></h4>
                                        </div>
                                        <div className="col-6">
                                            <h4 className="text-secondary"><span> {currentOffer.offerCode} </span></h4>
                                        </div>
                                    </div>
                                    <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
                                        <div className="col-6">
                                            <h4 className="f-w-500"> Offer Description<span className="pull-right">:</span></h4>
                                        </div>
                                        <div className="col-6">
                                            <h4 className="text-secondary"><span> {currentOffer.offerDescription||"No Description to Show"} </span></h4>
                                        </div>
                                    </div>
                                    <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
                                        <div className="col-6">
                                            <h4 className="f-w-500"> Start Of The Offer<span className="pull-right">:</span></h4>
                                        </div>
                                        <div className="col-6">
                                            <h4 className="text-secondary"><span> {doStartDay}-{monthdata[doStartMonth]}-{doStartYear} </span></h4>
                                        </div>
                                    </div>
                                    <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
                                        <div className="col-6">
                                            <h4 className="f-w-500"> End Of The Offer<span className="pull-right">:</span></h4>
                                        </div>
                                        <div className="col-6">
                                            <h4 className="text-secondary"><span> {doEndDay}-{monthdata[doEndMonth]}-{doEndYear} </span></h4>
                                        </div>
                                    </div>
                                    <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
                                        <div className="col-6">
                                            <h4 className="f-w-500"> Discount Percentage <span className="pull-right">:</span></h4>
                                        </div>
                                        <div className="col-6">
                                            <h4 className="text-secondary"><span> {currentOffer.discountPercentage} % </span></h4>
                                        </div>
                                    </div>
                                    <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
                                        <div className="col-6">
                                            <h4 className="f-w-500"> Status<span className="pull-right">:</span></h4>
                                        </div>
                                        <div className="col-6">
                                            {
                                            
                                                 currentOffer.status === "active" ? // confirmed
                                                    <h4 className="text-success"><span>Offer Is Active</span></h4>
                                                    : currentOffer.status === "inactive" ? // canceled by you
                                                        <h4 className="text-danger"><span>Offer Is Inactive</span></h4>
                                                        : ""
                                                            
                                        }
                                        
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <Link to={`/form-edit-offer/${id}`}>
                                        <button type="submit" className="btn btn-info m-1">                                     
                                            Edit Offer    
                                        </button>
                                    </Link>    
                                    
                                    <button type="submit" className="btn btn-danger m-1" onClick={()=>setdeleteOfferModal(true)}>
                                        Delete Offer                                       
                                    </button>
                                    
                                    <Modal className="fade"
                                        show={deleteOfferModal}
                                    >
                                        <Modal.Header>
                                            <Modal.Title>Are You Sure You want to Cancel Booking</Modal.Title>
                                            <Button
                                                variant=""
                                                className="btn-close"
                                            onClick={() => setdeleteOfferModal(false)}
                                            >
                                            </Button>
                                        </Modal.Header>
                                        <Modal.Body> Click Cancel if you still want to calncel this booking .. . otherwise click close</Modal.Body>
                                        <Modal.Footer>
                                            <Button
                                                onClick={() => setdeleteOfferModal(false)}                                               
                                                variant="primary light"
                                            >
                                                Close
                                            </Button>
                                            <Button variant="danger"
                                                onClick={handleDeleteOffer}    
                                            >
                                                Delete
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            
                            </div>
                        </div>
                    </Card>
                </div>
            </Fragment>
        )
    }
    
    else {
        return (
            <Fragment>
                <PageTitle activeMenu="Status" motherMenu="Offer" />
                
                <Row>             
                    <Col xl={6} className="col-xxl-12">                       
                        <Card>                        
                            <Card.Header className="d-block">                          
                                <Card.Title>Offer Status</Card.Title>                                       
                            </Card.Header>                     
                            <Card.Body>                                       
                                <Alert
                                    variant='danger'
                                    className="solid alert-square"
                                >                            
                                    <strong> NO Offer Exists For This Code</strong> Please Add An Offer if you like.
                                </Alert>
                            </Card.Body>                       
                        </Card>                    
                    </Col>                
                    <Col xl={6} className="col-xxl-12">                       
                        <Card>        
                            <Card.Body>                            
                                <Link to="/form-add-offer"> Click Here to Add An Offer </Link>
                            </Card.Body>
                    
                        </Card>                               
                    </Col>            
                </Row>
            </Fragment>

        )
    }
}

export default OfferDetails