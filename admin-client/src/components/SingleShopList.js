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
      <div className="col-lg-12 col-xl-3">
         <Link to={`/shop-detail/${_id}`}>
         <div className="card">
            <div className="card-body">
               <div className="row m-b-30">
                  <div className="col-md-5 col-xxl-12">
                     <div className="new-arrival-product mb-4 mb-xxl-4 mb-md-0">
                        <div className="new-arrivals-img-contnent">
                           <img className="img-fluid" src={shopImage||storePic} alt="Shop Image" style={{width:"300px" , height:"350px" ,objectFit:"cover"}} />
                        </div>
                     </div>
                  </div>
                  <div className="col-md-7 col-xxl-12">
                     <div className="new-arrival-content position-relative text-center">
                        
                        <h4>
                        {shopName} 
                              
                          
                        </h4>
                           <p className="text-secondary">  Shop Id: &nbsp; {shopId}</p>
                                                                         
                           <p className="text-content">  Owner : {ownerFullName}</p>
                                                  
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
