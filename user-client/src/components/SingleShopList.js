import React from "react";
import { Link } from "react-router-dom";


// image
import storePic from '../images/store.png';


const SingleShopList = (props) => {
   const {
      _id,
      shopImage,
      shopName,
      shopId,
      ownerFullName
   } = props.shop;

  
   return (
      <div className="col-lg-12 col-xl-4">
         <Link to={`/shop-menu/${_id}`}>
         <div className="card">
            <div className="card-body">
               <div className="row m-b-30 text-center">
                  <div className="col-md-5 col-xxl-12">
                     <div className="new-arrival-product mb-4 mb-xxl-4 mb-md-0">
                        <div className="new-arrivals-img-contnent">
                           <img className="img-fluid" src={shopImage||storePic} alt="Shop Image" style={{width:"300px" , height:"350px" ,objectFit:"cover"}} />
                        </div>
                     </div>
                  </div>
                  <div className="col-md-7 col-xxl-12">
                     <div className="new-arrival-content position-relative text-center">
                        
                        <h4 className="text-secondary">
                        {shopName} 
                              
                          
                        </h4>
                           <p>   Owner : {ownerFullName}</p>
                                                                        
                           <button type="submit" className="btn btn-secondary mb-1 ms-1" >
                                <span className="me-2"> <i className="far fa-arrow-alt-circle-right" /></span> Book A Service
                           </button>
                           <Link to={`/shop-detail/${_id}`}>
                              <button className="btn btn-primary mb-1 ms-1">
                                    <span className="me-2"> <i className="fa fa-info" /></span>Shop Details
                              </button>
                           </Link>                    	                                     
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