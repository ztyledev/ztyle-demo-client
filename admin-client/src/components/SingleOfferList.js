import React from "react";
import { Link} from "react-router-dom";


const SingleOfferList = (props) => {
   
    const {
        _id,
        offerCode,
        status
    } = props.item;
    
   
 

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
                        {offerCode} 
                              
                          
                        </h3>
                        <h4>   Status:   {status}</h4>
                        <Link to={`/offers/${_id}`}>            
                            <button type="submit" className="btn btn-secondary mb-1 ms-1" >
                                <span className="me-2"> <i className="far fa-arrow-alt-circle-right" /></span> Select
                            </button>
                        </Link>                                                                                                                                   	                                     
                     </div>
                  </div>
               </div>
            </div>
         </div>
       
      </div>
    );
};

export default SingleOfferList;