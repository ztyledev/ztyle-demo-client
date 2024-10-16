import React, { Fragment, useState, useEffect, useContext } from "react";
import { Card, Row, Col, Alert } from 'react-bootstrap';
import { Link ,useNavigate,useParams} from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';

//components
import { ThemeContext } from "../../context/ThemeContext";
import PageTitle from "../../components/PageTitle";
import swal from "sweetalert";
import Spinner from "../../components/Spinner/Spinner";


// actions 
import {
  getShopById,
  editShopById
} from '../../store/shop/shopActions';
import { resetShop } from '../../store/shop/shopSlice';



const FormAdvanceShopAdd = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  

  
  const { 

		changeSideBarStyle
		
	} = useContext(ThemeContext);
	useEffect(() => {

		changeSideBarStyle({ value: "modern", label: "Modern" });
		
	},[]);


  const { token } = useSelector(state => state.auth);

  // get current shop 
  useEffect(() => {
    dispatch(getShopById({ id, token }))
  }, [dispatch, id, token]);
  
  const { loadingShop, success, error, currentShop } = useSelector(state => state.shop);

  // display error
  useEffect(() => {
    if (error) {
      swal(error, "error");
    }
  }, [error]);


  // error object for validation
  let errorsObj = { address: '', location: '', accountId: '', category: '', menu: '' };
  const [errors, seterrors] = useState({errorsObj});
  
  // fields
  const [address, setaddress] = useState('');
  const [location, setlocation] = useState('');
  const [accountId, setaccountId] = useState('');
  const [category, setcategory] = useState('');
  const [menu, setmenu] = useState([]);
  
   const handleMenu=(e)=>{
    const {value,checked} = e.target;

    // console.log(`${value} is ${checked}`);

    if(checked){
      setmenu([...menu,value]);
    }
    else{
      setmenu(menu.filter((e) => e !== value))
    }
    
  }

  const handleSubmit=(e)=>{
    e.preventDefault();

    let error = false;
    const errorObj = { ...errorsObj };
    if (address === '') {
      errorObj.address = 'Address Of Shop Is Required';
      error = true;
    }
    if (location === '') {
      errorObj.location = 'Location Of Shop Is Required';
      error = true;
    }
    if (accountId === '') {
       errorObj.accountId = 'Account Id Of Shop Is Required';
       error = true;
    }
    if (category === '') {
      errorObj.category = 'Category Of Shop Is Required';
      error = true;
    }
    if (menu.length === 0) {
      errorObj.menu = 'Shop Menu Is Required';
      error = true;
    }
         
    seterrors(errorObj);

    if (error) {
      return
    }

    const shopData = { address, location, accountId, category, menu, profileCompletion: "100", advanceProfileStatus: true };
    
    const id = currentShop._id;
    dispatch(editShopById({ id, shopData, token }));
     
  }

   useEffect(() => {
    if (success&&currentShop) {
      navigate(`/shop-detail/${currentShop._id}`);
    }

   }, [navigate, currentShop, success]);
  
  useEffect(() => {
     return () => dispatch(resetShop());
    
  }, [dispatch]);
  
  if (currentShop) {
    
    return (
      <Fragment>
        <PageTitle
          activeMenu="Advance"
          motherMenu="Profile"
          pageContent="Advance"
        />

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Enter Additional Information</h4>
              </div>
              <div className="card-body">
                <div className="form-validation">
                  <form
                    className="form-valide"
                    action="#"
                    method="post"
                    onSubmit={handleSubmit}
                  >
                    <h4 className="text-secondary"> Info About Selected Shop</h4>
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="form-group mb-3 row">
                          <label
                            className="col-lg-4 col-form-label"
                            htmlFor="val-category"
                          >
                            Category Of The Shop
                            <span className="text-danger">*</span>
                          </label>
                          <div className="col-lg-6">
                            <select
                              className="form-control"
                              id="val-category"
                              name="val-category"
                              value={category}
                              onChange={(e) => setcategory(e.target.value)}
                            >
                              <option value="">Please select</option>
                              <option value="Salon">Salon</option>
                              <option value="Spa">Spa</option>
                              <option value="Beauty Parlor">Beauty Parlor</option>
                              <option value="Nail Salon">Nail Salon</option>
                              <option value="Skin Care Clinic">Skin Care Clinic</option>
                              <option value="Makeup Studio">Makeup Studio</option>
                              <option value="Massage Therapy Center">Massage Therapy Center</option>
                              <option value="Cosmetic Surgery Clinic">Cosmetic Surgery Clinic</option>
                              <option value="Wellness Center">Bahrain</option>
                              <option value="Others">Others</option>
                            
                            </select>
                          </div>
                          {errors.category && <div className="text-danger fs-12">{errors.category}</div>}
                        </div>
                        <div className="form-group mb-3 row">
                          <label
                            className="col-lg-4 col-form-label"
                            htmlFor="val-location"
                          >
                            Shop's Geo Location
                            <span className="text-danger">*</span>
                          </label>
                          <div className="col-lg-6">
                            <input
                              type="text"
                              className="form-control"
                              id="val-location"
                              name="val-location"
                              placeholder="Enter Shops Geo Location"
                              value={location}
                              onChange={(e) => setlocation(e.target.value)}

                            />
                          </div>
                          {errors.location && <div className="text-danger fs-12">{errors.location}</div>}
                        </div>
                        <div className="form-group mb-3 row">
                          <label
                            className="col-lg-4 col-form-label"
                            htmlFor="val-address"
                          >
                            Shop's Address <span className="text-danger">*</span>
                          </label>
                          <div className="col-lg-6">
                            <textarea
                              className="form-control"
                              id="val-address"
                              name="val-address"
                              rows="30"
                              placeholder="Enter Address Of Shop"
                              value={address}
                              onChange={(e) => setaddress(e.target.value)}
                            ></textarea>
                          </div>
                          {errors.address && <div className="text-danger fs-12">{errors.address}</div>}
                        </div>
                        <div className="form-group mb-3 row">
                          <label
                            className="col-lg-4 col-form-label"
                            htmlFor="val-accountId"
                          >
                            Back Account Id(Payment Gateway)
                            <span className="text-danger">*</span>
                          </label>
                          <div className="col-lg-6">
                            <input
                              type="text"
                              className="form-control"
                              id="val-accountId"
                              name="val-accountId"
                              placeholder="Enter Account Id For Payment"
                              value={accountId}
                              onChange={(e) => setaccountId(e.target.value)}

                            />
                          </div>
                          {errors.accountId && <div className="text-danger fs-12">{errors.accountId}</div>}
                        </div>
                        <div className="form-group mb-3 row">
                          <div className="col-xl-6 col-lg-6">
                            <div className="card">
                              <label
                                className="col-lg-4 col-form-label"
                                htmlFor="val-menu"
                              >
              
                                Shop's Menu
                              </label>
              
                              <div className="card-body">
                                <div className="basic-form">
                                
                                  <div className="form-group">
                                    <div className="form-check form-check-inline">
                                      <label className="form-check-label">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          value="Hair Cut"
                                          onChange={handleMenu}
                                        />
                                        Hair Cut
                                      </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <label className="form-check-label">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          value="Shave"
                                          onChange={handleMenu}
                                        />
                                        Shave
                                      </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <label className="form-check-label">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          value="Hair Cut & Shave"
                                          onChange={handleMenu}
                                        />
                                        Hair Cut & Shave
                                      </label>
                                    </div>
                            
                                  
                                 
                                  </div>
                                </div>
                              </div>
                            </div>
                            {errors.menu && <div className="text-danger fs-12">{errors.menu}</div>}
                          </div>
                        </div>
                      
                      

                      
                                     
              
                        <div className="form-group mb-3 row">
                          <div className="col-lg-8 ms-auto">
                            <button type="submit" className="btn btn-secondary">
                              {loadingShop ? <Spinner /> : "Submit"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
       
        </div>
      </Fragment>
    );
    
  }

  else {

     return (
      <Fragment>
         <PageTitle activeMenu="Basic" motherMenu="Shop" />                                 
         <Row>           
           <Col xl={6} className="col-xxl-12">             
             <Card>               
               <Card.Header className="d-block">                
                 <Card.Title>Shop Profile Status</Card.Title>                                                   
               </Card.Header>               
               <Card.Body>                                                   
                 <Alert                   
                   variant='info'                   
                   className="solid alert-square"                   
                 >                   
                   <strong> No Shop Is Registered For This Id</strong> Please Fill Up Shop Profile if you like.
                 </Alert>                                
               </Card.Body>
             </Card>
           </Col>
           <Col xl={6} className="col-xxl-12">
             <Card>
               <Card.Body>
                 <Link to="/form-add-basic-shop"> Click Here to Fill Up your  Profile </Link>
               </Card.Body>                              
             </Card>                                    
           </Col>
         </Row>
       </Fragment>
    )
  
  }

};



export default FormAdvanceShopAdd;
