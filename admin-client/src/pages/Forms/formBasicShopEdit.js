import React, { Fragment, useState , useEffect ,useContext} from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Card, Col, Alert } from "react-bootstrap";

// components
import { ThemeContext } from "../../context/ThemeContext";
import PageTitle from "../../components/PageTitle";
import Spinner from "../../components/Spinner/Spinner";
import swal from 'sweetalert';

// data
import { statedata } from "../../data/statedata";


// actions
import {
  getShopById,
  editShopById
} from '../../store/shop/shopActions';
import { resetShop } from '../../store/shop/shopSlice';



const FormBasicShopEdit = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  

 
  const { 
		
		changeSideBarStyle
		
	} = useContext(ThemeContext);
	useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
	},[]);
 
   

  // check for jwt
  const { token } = useSelector(state => state.auth);

  // get shop profile for id

  useEffect(() => {
    dispatch(getShopById({ id, token }))
  }, [dispatch, id, token]);

  
  // access redux states
  const { currentShop, loadingShop, success ,error } = useSelector(state => state.shop);
  
  // display error
  useEffect(() => {
    if (error) {
      swal(error, "error");
    }
  }, [error]);


  // error object for  
  let errorsObj = { shopName: '', shopId: '', ownerFullName: '', mobile: '', state: '', district: '', workingDays: '', openingTime: '', closingTime: '' };
  const [errors, seterrors] = useState({errorsObj});

  const [shopName, setshopName] = useState('');
  const [shopId, setshopId] = useState('');
  const [ownerFullName, setownerFullName] = useState('');
  const [mobile, setmobile] = useState('');
  // const [workingDays, setworkingDays] = useState([]);
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

  // const handleWorkingDays=(e)=>{
  //   const {value,checked} = e.target;

  //   if(checked){
  //     setworkingDays([...workingDays,value]);
  //   }
  //   else{
  //     setworkingDays(workingDays.filter((e) => e !== value))
  //   }
    
  // }


  useEffect(() => {
    if (currentShop) {
      // display current db values
      setshopName(currentShop.shopName);
      setshopId(currentShop.shopId);
      setownerFullName(currentShop.ownerFullName);
      setmobile(currentShop.mobile);
      setData({ state: currentShop.state, district: currentShop.district });
      // setworkingDays(currentShop.workingDays);
      setopeningTime(currentShop.openingTime);
      setclosingTime(currentShop.closingTime);
      
    }
    
  }, [currentShop]);



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
    // if (workingDays === '') {
    //   errorObj.workingDays = 'Working Days is Required';
    //   error = true;
    // }
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
    const shopData = { shopName, shopId, ownerFullName, mobile, state, district, openingTime, closingTime, profileCompletion: "50" }
    
    const id = currentShop._id;

    dispatch(editShopById({ shopData, id, token }));


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
                      {/* <div className="form-group mb-3 row">
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
                                    <div className="form-check form-check-inline">
                                      <label className="form-check-label">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          value="Sunday"
                                          onChange={handleWorkingDays}
                                        />
                                        Sunday
                                      </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <label className="form-check-label">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          value="Monday"
                                          onChange={handleWorkingDays}
                                        />
                                        Monday
                                      </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <label className="form-check-label">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          value="Tuesday"
                                          onChange={handleWorkingDays}
                                        />
                                        Tuesday
                                      </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <label className="form-check-label">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          value="Wednesday"
                                          onChange={handleWorkingDays}
                                        />
                                        Wednesday
                                      </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <label className="form-check-label">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          value="Thursday"
                                          onChange={handleWorkingDays}
                                        />
                                        Thursday
                                      </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        value="Friday"
                                        onChange={handleWorkingDays}
                                      />
                                      Friday
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        value="Saturday"
                                        onChange={handleWorkingDays}
                                      />
                                      Saturday
                                    </label>
                                  </div>
                                  
                                  
                                  </div>
                              </div>
                            </div>
                          </div>
                          {errors.workingDays && <div className="text-danger fs-12">{errors.workingDays}</div>}
                        </div>
                      </div> */}
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
  );
                    }
                    else{
                      return(
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
                                      variant='danger'
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


export default  FormBasicShopEdit;

