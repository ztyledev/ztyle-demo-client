import React from "react";
import { Link } from "react-router-dom";


// image
import defaultProfilePic from '../images/avatar/defaultProfilePic.png';


const SingleShopList = (props) => {
   const {
      _id,
      fullName,
      designation,
      status,
   } = props.admin;

  
   return (
      <div className="col-lg-12 col-xl-3">
         <Link to={`/admin-detail/${_id}`}>
         <div className="card">
            <div className="card-body">
               <div className="row m-b-30">
                  <div className="col-md-5 col-xxl-12">
                     <div className="new-arrival-product mb-4 mb-xxl-4 mb-md-0">
                        <div className="new-arrivals-img-contnent">
                           <img className="img-fluid" src={defaultProfilePic} alt="Admin Profile Image" style={{width:"300px" , height:"350px" ,objectFit:"cover"}} />
                        </div>
                     </div>
                  </div>
                  <div className="col-md-7 col-xxl-12">
                     <div className="new-arrival-content position-relative text-center">
                        
                        <h4>
                        {fullName} 
                              
                          
                        </h4>
                           <p className="text-secondary">  Status: &nbsp; {status}</p>
                                                                         
                           <p className="text-content">  Designation : {designation}</p>
                                                  
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
