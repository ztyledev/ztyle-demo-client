import React, { Fragment, useState , useEffect,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';


// data
import { statedata } from "../../data/statedata";
import { weekdata } from '../../data/weekdata';

// components
import { ThemeContext } from "../../context/ThemeContext";
import PageTitle from "../../components/PageTitle";
import Spinner from "../../components/Spinner/Spinner";
import swal from 'sweetalert';
import CheckBox from '../../components/CheckBox';


// actions
import {
  addShop
} from '../../store/shop/shopActions'
import { resetShop } from '../../store/shop/shopSlice';

const FormBasicShopAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 

  const { 
		
		changeSideBarStyle
		
	} = useContext(ThemeContext);
	useEffect(() => {

		changeSideBarStyle({ value: "modern", label: "Modern" });
	},[]);


  // access user state
  const { token } = useSelector(state => state.auth);
  
  // error object for  fields
  let errorsObj = { shopName: '', shopId: '', ownerFullName: '', mobile: '', state: '', district: '', workingDays: '', openingTime: '', closingTime: '' };
  const [errors, seterrors] = useState({errorsObj});

  const [shopName, setshopName] = useState('');
  const [shopId, setshopId] = useState('');
  const [ownerFullName, setownerFullName] = useState('');
  const [mobile, setmobile] = useState('');
  const [workingDays, setworkingDays] = useState(weekdata);
  const [openingTime, setopeningTime] = useState('');
  const [closingTime, setclosingTime] = useState('');
  

  
  const [{ state, district }, setData] = useState({state:'',district:''}); 
  const states = statedata.map((state) => {
    return (
      <option key={state.name} value={state.name}>
        {state.name}
      </option> 
    )
  })
  const districts = statedata.find(item => item.name === state)?.districts.map((district) => {
    return (
      <option key={district} value={district}>
        {district}
      </option>
    )
  })
  
  const handleStateChange = (e) => {
    setData(data=>({district:"",state:e.target.value}))
  }

  const handleDistrictChange = (e) => {
    setData(data=>({...data, district:e.target.value}))
  }

  const workingDaysHandler = (index) => {
    setworkingDays(
      workingDays.map((day, currentIndex) =>
        currentIndex === index ?
          { ...day, checked: !day.checked }
          : day
      )
    )
  }


  const handleSubmit=(e)=>{
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (shopName === '') {
      errorObj.shopName = 'Shop Name is Required';
      error = true;
    }
    
    if (shopId === '') {
      errorObj.shopId = 'Shop Id is Required';
      error = true;
    }
    if (ownerFullName === '') {
      errorObj.ownerFullName = 'Name Of Owner is Required';
      error = true;
    }
    if (mobile === '') {
      errorObj.mobile = 'Mobile Number is Required';
      error = true;
    }
    if (state === '') {
      errorObj.state = 'State is Required';
      error = true;
    }
    if (district === '') {
      errorObj.district = 'District is Required';
      error = true;
    }
    if (workingDays === '') {
      errorObj.workingDays = 'Working Days is Required';
      error = true;
    }
    if (openingTime === '') {
      errorObj.openingTime = 'Opening Time is Required';
      error = true;
    }
    if (closingTime === '') {
      errorObj.closingTime = 'Closing Time Type is Required';
      error = true;
    }
    

          seterrors(errorObj);

          if(error){
            return
    }
    
    const exactShopId = shopId.toLocaleLowerCase();

    
    const shopData = { shopName, shopId:exactShopId, ownerFullName, mobile, state, district, workingDays, openingTime, closingTime, profileCompletion: "50" }
    dispatch(addShop({ shopData, token }));
         
  }

  const { currentShop, loadingShop, success ,error } = useSelector(state => state.shop);

  useEffect(() => {
    if (success&&currentShop) {
      navigate(`/shop-detail/${currentShop._id}`);
    }

  }, [navigate, currentShop, success]);
  
  useEffect(() => {
    if (error) {
      swal(error, "error");

    }
  }, [error]);

   useEffect(() => {
     return () => dispatch(resetShop());
    
  }, [dispatch]);


  return (
    <Fragment>
      <PageTitle
        activeMenu="Basic"
        motherMenu="Shop"
        pageContent="Basic"
      />

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Please Enter Following Details</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form
                  className="form-valide"
                  action="#"
                  method="post"
                  onSubmit={handleSubmit}
                >
                  <h4 className="text-secondary">Basic Information</h4>
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-shopName"
                        >
                          Name Of The Shop
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-shopName"
                            name="val-shopName"
                            placeholder="Enter Name Of Shop.."
                            value={shopName}
                            onChange={(e)=> setshopName(e.target.value) }
                          />
                          
                        </div>
                        {errors.shopName && <div className="text-danger fs-12">{errors.shopName}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-ownerFullName"
                        >
                          Owner's FullName <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-ownerFullName"
                            name="val-ownerFullName"
                            placeholder="Shop Owner's Name"
                            value={ownerFullName}
                            onChange={(e)=>setownerFullName(e.target.value)}
                          />
                        </div>
                        {errors.ownerFullName && <div className="text-danger fs-12">{errors.ownerFullName}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-mobile"
                        >
                          Mobile Number
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-mobile"
                            name="val-mobile"
                            placeholder="Enter Your Mobile Number.."
                            value={mobile}
                            onChange={(e)=>setmobile(e.target.value)}
                          />
                        </div>
                        {errors.mobile && <div className="text-danger fs-12">{errors.mobile}</div>}
                      </div>
                      
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
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-district"
                        >
                          District
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <select
                            className="form-control"
                            id="val-district"
                            name="val-district"
                            value={district}
                            onChange={handleDistrictChange}
                          >
                            <option value="">Please select</option>
                            {districts}
                          </select>
                        </div>
                        {errors.district && <div className="text-danger fs-12">{errors.district}</div>}
                      </div>

                      {/* <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-suggestions"
                        >
                          Suggestions <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <textarea
                            className="form-control"
                            id="val-suggestions"
                            name="val-suggestions"
                            rows="5"
                            placeholder="What would you like to see?"
                          ></textarea>
                        </div>
                      </div> */}
                    </div>
                    <div className="col-xl-6">
                      <h4 className="text-secondary">Shop Info</h4>
                      
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
                            placeholder="Id For New Shop"
                            value={shopId}
                            onChange={(e)=>setshopId(e.target.value)}
                          />
                        </div>
                        {errors.shopId && <div className="text-danger fs-12">{errors.shopId}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <div className="col-xl-6 col-lg-6">
                          <div className="card">
                            <label
                            className="col-lg-4 col-form-label"
                            htmlFor="val-workingDays"
                            >
              
                              Working Days
                            </label>
              
                            <div className="card-body">
                              <div className="basic-form">
                                <div className="form-group">
                                  {
                                    workingDays.map((day, index) => (
                                      <CheckBox
                                        key={day.name}
                                        isChecked={day.checked}
                                        checkHandler={() => workingDaysHandler(index)}
                                        label={day.name}
                                        index={index}                        
                                      />
                                    ))
                                  }  
                                  
                                    
                                    
                                    
                                  
                                </div>
                              </div>
                            </div>
                          </div>
                          {errors.workingDays && <div className="text-danger fs-12">{errors.workingDays}</div>}
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-openingTime"
                        >
                          Opening Time
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                              type="time"
                              className="form-control"
                              id="val-openingTime"
                              name="val-openingTime"
                              placeholder="Enter Opening Time.."
                              value={openingTime}
                              onChange={(e)=> setopeningTime(e.target.value) }
                            />
                        </div>
                        {errors.openingTime && <div className="text-danger fs-12">{errors.openingTime}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-closingTime"
                        >
                          Closing Time
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                              type="time"
                              className="form-control"
                              id="val-closingTime"
                              name="val-closingTime"
                              placeholder="Enter Opening Time.."
                              value={closingTime}
                              onChange={(e)=> setclosingTime(e.target.value) }
                            />
                        </div>
                        {errors.closingTime && <div className="text-danger fs-12">{errors.closingTime}</div>}
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
  )
                   
};

export default FormBasicShopAdd;
