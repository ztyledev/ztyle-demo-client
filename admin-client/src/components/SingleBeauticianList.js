import React from "react";
import { Link } from "react-router-dom";


// image
import beauticianProfilePic from '../images/avatar/beauticianProfilePic.png';


const SingleShopList = (props) => {
   const {
      _id,
      profilePic,
      fullName,
      position,
      mobile
   } = props.beautician;

  
   return (
      <div className="col-lg-12 col-xl-3">
         <Link to={`/beautician-detail/${_id}`}>
         <div className="card">
            <div className="card-body">
               <div className="row m-b-30">
                  <div className="col-md-5 col-xxl-12">
                     <div className="new-arrival-product mb-4 mb-xxl-4 mb-md-0">
                        <div className="new-arrivals-img-contnent">
                           <img className="img-fluid" src={profilePic||beauticianProfilePic} alt="profile-pic" style={{width:"300px" , height:"350px" ,objectFit:"cover"}} />
                        </div>
                     </div>
                  </div>
                  <div className="col-md-7 col-xxl-12">
                     <div className="new-arrival-content position-relative text-center">
                        
                        <h4>
                        {fullName} 
                              
                          
                        </h4>
                           <p className="text-secondary">  Position: &nbsp; {position}</p>
                                                                         
                           <p className="text-content">  Contact Number : {mobile}</p>
                                                  
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
