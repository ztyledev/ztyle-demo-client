import React, { Fragment, useState, useEffect, useContext } from "react";
import { Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


// components
import { ThemeContext } from "../../../context/ThemeContext";
import PageTitle from "../../../components/PageTitle";
import swal from "sweetalert";
import Spinner from "../../../components/Spinner/Spinner";

// actions

import {
    resetBooking
} from '../../../store/booking/bookingSlice';
import {
    getSlots
} from '../../../store/booking/bookingActions';


const SelectDate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // reset redux state on mount
    useEffect(() => {
        dispatch(resetBooking());
    }, [dispatch]);

    // redux states
    const { token } = useSelector(state => state.auth);
    const { selectedMenu, currentShop, } = useSelector(state => state.shop);
    const { currentBeautician } = useSelector(state => state.beautician);

  
    const { 
        changeSideBarStyle
    } = useContext(ThemeContext);
    useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
	},[]);

     // error object for validation
    let errorsObj = { dobook: '' };
    const [errors, seterrors] = useState({ errorsObj });
    
    // fields 
    const [dobook, setdobook] = useState('');
    const [success, setsuccess] = useState(false);


    const [reviewModal, setReviewModal] = useState(false);
  

    const handleProceed = (e) => {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
          
        if (dobook === '') {
            errorObj.dobook = 'Please Select A Date To Book A Slot';
            error = true;
        }
        seterrors(errorObj);
        
        if (error) {
            return
        }

        const searchData = { beauticianId: currentBeautician._id, date: dobook };

        dispatch(getSlots({ searchData, token }));
        setsuccess(true);
        
    }

    const { loading, slotDetails, error } = useSelector(state => state.booking)
    

    // display error
	useEffect(() => {
        if (error) {
            setsuccess(false);
			swal(error, "error");
		}
    }, [error]);
    
    // navigate to slots

    useEffect(() => {
        if (slotDetails && !error && success) {
            setsuccess(false);
            navigate('/select-slot');
        }
    }, [error, navigate, slotDetails,success]);
    
    
    if (currentShop && currentBeautician) { 
        return (
            <Fragment>
                <PageTitle activeMenu="Select Date Of Booking" motherMenu="Booking" />
                <div className="center-60">
                    <Card>                       
                        <Card.Header className="d-block">
                            <Card.Title className="text-center mb-4">
                                <h2 className="text-secondary"> You Are Nearly There </h2>
                            </Card.Title> 
                        </Card.Header>
                        <div className="card-body">                           
                            <div className="profile-about-me">  
                                <h3 className="text-info">Your Booking Details</h3>
                                <div className="pt-4 border-bottom-1 pb-3">
                                   
                                    <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
                                        <div className="col-6">
                                            <h4 className="f-w-500"> Booked Shop<span className="pull-right">:</span></h4>
                                        </div>
                                        <div className="col-6">
                                           <h4 className="text-secondary"><span> {currentShop.shopName} </span></h4> 
                                        </div>
                                    </div>
                                    <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>                                      
                                        <div className="col-6">
                                            <h4 className="f-w-500"> Selected Service<span className="pull-right">:</span></h4>
                                        </div>
                                        <div className="col-6">
                                           <h4 className="text-secondary"><span> {selectedMenu.name} </span></h4> 
                                        </div>
                                    </div>
                                     <div className="row mb-2" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>                                      
                                        <div className="col-6">
                                            <h4 className="f-w-500"> Beautician<span className="pull-right">:</span></h4>
                                        </div>
                                        <div className="col-6">
                                           <h4 className="text-secondary"><span> {currentBeautician.fullName} </span></h4> 
                                        </div>
                                    </div>
                                </div>
                                 <div className="profile-about-me">  
                                    <h3 className="text-info">Select The Date</h3>
                                    <div className="pt-4 border-bottom-1 pb-3">
                                        <div className="form-validation">
                                            <form                                              
                                                className="form-valide"
                                                action="#"
                                                method="post"
                                                onSubmit={handleProceed}
                                            >
                                                <div className="form-group mb-3 row" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
                                                    <label
                                                        className="col-lg-4 col-form-label"
                                                        htmlFor="val-dobook"
                                                    >
                                                    Booking Date
                                                    <span className="text-danger">*</span>
                                                    </label>
                                                    <div className="col-lg-6">
                                                    
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            name="dob"
                                                            id="dob"
                                                            value={dobook}
                                                            onChange={(e) => setdobook(e.target.value)}
                                                        />
                                                    
                                                    </div>
                                                    {errors.dobook && <div className="text-danger fs-12">{errors.dobook}</div>}
                                                </div>
                                                
                                                <div className="form-group mb-3 row" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
                                                    <div className="col-lg-8 ms-auto">                                                   
                                                        <button type="submit" className="btn btn-secondary">                                                       
                                                            {loading ? <Spinner /> : "Proceed"}
                                   
                                                        </button>                                                    
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>                          
                        </div>                       
                    </Card>                                                                       
                </div>                
            </Fragment>            
    );
    }
    

 
};



export default  SelectDate ;