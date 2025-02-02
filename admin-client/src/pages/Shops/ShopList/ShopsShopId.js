import React, { Fragment, useState ,useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Modal,Row, Card, Col, Alert,Badge, Media} from "react-bootstrap";
import {useSelector,useDispatch} from 'react-redux'

// components
import { ThemeContext } from "../../../context/ThemeContext";
import PageTitle from "../../../components/PageTitle";
import Spinner from "../../../components/Spinner/Spinner";
import swal from "sweetalert";
import SingleShopList from "../../../components/SingleShopList";
import LoadingScreen from "../../../components/LoadingScreen";


// actions
import {
  getActiveShopByShopId
} from '../../../store/shop/shopActions';


const ShopsShopId = () => {

  const dispatch = useDispatch();
  
  // redux states
  const { token } = useSelector(state => state.auth);
  const { activeShops, loadingShop, error } = useSelector(state => state.shop);

  // error object 
    let errorsObj = { state: '', district: '' };
  const [errors, setErrors] = useState(errorsObj);

  // field for search

    const [shopId, setshopId] = useState('');
    
  const handleSubmit = (e) => {
    e.preventDefault();
    // front end validation
    let error = false;
    const errorObj = { ...errorsObj };

    if (shopId === '') {
      errorObj.shopId = 'Shop Id Is Required';
      error = true;
      }

    setErrors(errorObj);

    if (error) {
		
			return ;
      }
      
      const exactShopId = shopId.toLowerCase();
      const searchData = { shopId: exactShopId };
      dispatch(getActiveShopByShopId({ searchData, token }));
      
  }
  
	
  
  const { 
		changeSideBarStyle
	} = useContext(ThemeContext);
	useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
	},[]);

  const [reviewModal, setReviewModal] = useState(false);

  

  useEffect(() => {
    if (error) {
      swal(error, "error");

    }
  }, [error]);



  

   if (loadingShop) {
    return(
      <div>
        <LoadingScreen />
      </div>
      
		)
  }
  
   else if (activeShops) {
  
    return (
      <Fragment>
        <PageTitle activeMenu="Active" motherMenu="Shops" />

          <div className="row">
            {activeShops ?  <SingleShopList shop={activeShops} /> :
              <div className="text-danger text-center ">
                No profiles found. please wait a while for new shops
              </div>
            }

        
            </div>
      </Fragment>
    );
  }
  else {
       return (
           <Fragment>
        <PageTitle activeMenu="Shop Id" motherMenu="Active Shops" />
        <Row>
          <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                    <div className="auth-form">
                      <h4 className="text-center mb-4 ">Enter The Shop Id to Search</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3 row">
                                <label
                                className="col-lg-4 col-form-label"
                                htmlFor="val-shopId"
                                >
                                    Shop Id
                                    <span className="text-danger">*</span>
                                                    
                                </label>
                                <div className="col-lg-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="val-shopId"
                                        name="val-shopId"
                                        placeholder="Enter Shop Id.."
                                        value={shopId}
                                        onChange={(e)=> setshopId(e.target.value) }
                                    />
                          
                                </div>
                                 {errors.shopId && <div className="text-danger fs-12">{errors.shopId}</div>}
                            </div>
                            <div className="form-group mb-3 row">
                                <div className="col-lg-8 ms-auto">
                                    <button type="submit" className="btn btn-secondary">
                                        {loadingShop ? <Spinner /> : "Submit"}
                                    </button>
                                </div>
                            </div>                   
                                               
                       </form>                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </Row>
      </Fragment>
     )
  }

};



export default  ShopsShopId ;