import React from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';


// actions
import {
    getMenuItem
} from '../store/shop/shopActions'


const SingleShopMenu = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        name,
        price
    } = props.item;
    
    // redux states
    const { token } = useSelector(state => state.auth);

    const handleBookService = () => {
        
        dispatch(getMenuItem({ item: props.item, token }));
        navigate(`/beautician-select/${id}`);
        
    }
   
    
  
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
                        {name} 
                              
                          
                        </h3>
                           <h4>   Price:  &#8377; {price}</h4>
                                                                        
                           <button type="submit" className="btn btn-secondary mb-1 ms-1" onClick={handleBookService} >
                                <span className="me-2"> <i className="far fa-arrow-alt-circle-right" /></span> Select
                           </button>
                                         	                                     
                     </div>
                  </div>
               </div>
            </div>
         </div>
       
      </div>
   );
};

export default SingleShopMenu;