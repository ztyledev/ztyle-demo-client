import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

// image
import beauticianProfilePic from '../images/avatar/beauticianProfilePic.png';

// action 
import {
    getBeauticianById
} from '../store/beautician/beauticianActions'

const SingleShopList = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const {
        _id,
        profilePic,
        fullName,
        position,
        specialty
    } = props.beautician;
    
    // redux state
    const { token } = useSelector(state => state.auth)
   
    const handleBeauticianSelect = () => {
        dispatch(getBeauticianById({ id: _id, token })); 
            navigate('/select-date');
    }

    
    return (  
        <div className="col-lg-12 col-xl-3">                      
            <div className="card"> 
                
                <div className="card-body">                     
                    <div className="row m-b-30">                         
                        <div className="col-md-5 col-xxl-12">                             
                            <div className="new-arrival-product mb-4 mb-xxl-4 mb-md-0">                                   
                                <div className="new-arrivals-img-contnent">                                      
                                    <img className="img-fluid" src={profilePic || beauticianProfilePic} alt="profile-pic" style={{ width: "300px", height: "350px", objectFit: "cover" }} />                                       
                                </div>                                  
                            </div>                         
                        </div>                                               
                        <div className="col-md-7 col-xxl-12">                                
                            <div className="new-arrival-content position-relative text-center">                            
                                <h4>                                               
                                    {fullName}                                                                                            
                                </h4>                                    
                                <p className="text-secondary">  Position: &nbsp; {position}</p>                                                                                                                 
                                <p className="text-content">  Specialty : {specialty}</p>                                   
                            <button type="submit" className="btn btn-secondary mb-1 ms-1" onClick={handleBeauticianSelect} >
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

export default SingleShopList;
