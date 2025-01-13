import React from "react";
import { Link } from "react-router-dom";
import { Button} from 'react-bootstrap';
// utils
import { getStandardTime } from '../utils/getStandardTime';

// data
import { monthdata } from '../data/monthdata';


const SingleShopList = (props) => {
   const {
      _id,
       date,
       slot,
       service,
       status
   } = props.booking;

    // manage date
    const dobook = date;
    const dateOfBook = new Date(dobook);
    const dobookDay = dateOfBook.getDate();
    const dobookMonth = dateOfBook.getMonth();
    const dobookYear = dateOfBook.getFullYear();
            
    // manage time
    const stdStart = getStandardTime(slot.start);
    const stdEnd = getStandardTime(slot.end);
    
  
   return (
       <div className="col-lg-12 col-xl-4">
           <Link to={`/current-booking/${_id}`}>
               <div className="card">
                   <div className="card-body">
                       <div className="row m-b-30 text-center">
                           <div className="col-md-5 col-xxl-12">
                               <div className="new-arrival-product mb-4 mb-xxl-4 mb-md-0">
                                    
                               </div>
                           </div>
                           <div className="col-md-7 col-xxl-12">
                               <div className="new-arrival-content position-relative text-center">                                 
                                   <h3 className="text-secondary">
                                       Date : {dobookDay}-{monthdata[dobookMonth]}-{dobookYear}
                                   </h3>
                                   <h4>   From : {stdStart}</h4>
                                   <h4>  To : {stdEnd}</h4>
                                   <h4> Booked Service :{service}</h4>
                                   {
                                       status === "pending" ?  // pending
                                           <button type="submit" className="btn btn-warning light mb-1 ms-1" >
                                               <span className="me-2"> <i className="fa fa-info" /></span> Waiting for Confirmation
                                           </button>
                                           : status === "confirmed" ?
                                               <button type="submit" className="btn btn-info light mb-1 ms-1" >
                                                   <span className="me-2"> <i className="fa fa-thumbs-up" /></span> Booking Confirmed
                                               </button>
                                               : status === "canceled by user" ?
                                                   <button type="submit" className="btn btn-danger light mb-1 ms-1" >
                                                       <span className="me-2"> <i className="fa fa-times" /></span> Canceled By User
                                                   </button>
                                                   : status === "canceled by beautician" ?
                                                       <button type="submit" className="btn btn-danger light mb-1 ms-1" >
                                                           <span className="me-2"> <i className="fa fa-times" /></span> Canceled By You                                                       
                                                       </button>
                                                       : status === "completed" ?
                                                           <button type="submit" className="btn btn-success light mb-1 ms-1" >
                                                               <span className="me-2"> <i className="fa fa-check" /></span> Service Completed    
                                                           </button>
                                                           : ""
                                       
                                   }
                                    
                                    
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </Link>
                </div>
    );
};

export default SingleShopList;