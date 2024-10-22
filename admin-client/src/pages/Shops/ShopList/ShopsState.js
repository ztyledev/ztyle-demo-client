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

// data
import { statedata } from '../../../data/statedata';

// actions
import {
  getActiveShopsByState
} from '../../../store/shop/shopActions';


const ShopsState = () => {

  const dispatch = useDispatch();
  
  // redux states
  const { token } = useSelector(state => state.auth);
  const { activeShops, loadingShop, error } = useSelector(state => state.shop);

  // error object 
  let errorsObj = { state: '' };
  const [errors, setErrors] = useState(errorsObj);

  // field for search
  const [state, setstate] = useState('');

  const states = statedata.map((state) => {
    return (
      <option key={state.name} value={state.name}>
        {state.name}
      </option> 
    )
  })

  const handleStateChange = (e) => {
    setstate(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // front end validation
    let error = false;
    const errorObj = { ...errorsObj };

    if (state === '') {
      errorObj.state = 'State Is A Required Field';
      error = true;
    }

    setErrors(errorObj);

    if (error) {
		
			return ;
		}

    const searchData = { state };
    dispatch(getActiveShopsByState({ searchData, token }));

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
        <PageTitle activeMenu="State" motherMenu="Active Shops" />

          <div className="row">
            {activeShops ? activeShops.map((shop) => <SingleShopList key={shop._id} shop={shop} />) :
              <div className="text-danger text-center ">
                No profiles found. please wait a while for new profiles
              </div>
            }

        
            </div>
      </Fragment>
    );
  }
  else {
    return(
      <Fragment>
        <PageTitle activeMenu="State" motherMenu="Active Shops" />
        <Row>
          <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                    <div className="auth-form">
                      <h4 className="text-center mb-4 ">Select the State From List</h4>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3 row">
                          <label
                            className="col-lg-4 col-form-label"
                            htmlFor="val-state"
                          >
                            State                           
                            <span className="text-danger">*</span>                           
                          </label>
                          <div className="col-lg-6">                           
                            <select
                              className="form-control"
                              id="val-state"
                              name="val-state"
                              value={state}
                              onChange={handleStateChange}
                            >                             
                              <option value="">Please select</option>                              
                              {states}                             
                            </select>                           
                          </div>                          
                          {errors.state && <div className="text-danger fs-12">{errors.state}</div>}                         
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



export default  ShopsState ;
