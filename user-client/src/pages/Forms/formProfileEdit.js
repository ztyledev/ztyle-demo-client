import React, { Fragment, useState , useEffect ,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

// components
import PageTitle from "../../components/PageTitle";
import Spinner from "../../components/Spinner/Spinner";
import swal from "sweetalert";

import { Row, Card, Col, Alert } from "react-bootstrap";

import { ThemeContext } from "../../context/ThemeContext";

// import url


// actions
import {
  getUserProfile,
  editUserProfile
} from '../../store/userProfile/userProfileActions'


const FormProfileEdit = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { 
		
		changeSideBarStyle
		
	} = useContext(ThemeContext);
	useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
	},[]);
 
  const { userInfo, token } = useSelector(state => state.auth);

  // get current user profile
  useEffect(() => {
    dispatch(getUserProfile({ email: userInfo.email, token }));

  }, [dispatch, token, userInfo.email]);
  
  const { userProfile, loading, success, error } = useSelector(state => state.userProfile);

  // alert the error
  useEffect(() => {
    if (error) {
      swal(error, "error");
    }
  }, [error]);
  
  // error object for validation  
  let errorsObj = { fullName: '', email: '', gender: '', dob: '', address: '', mobile: '' };
  const [errors, seterrors] = useState({errorsObj});

  const [fullName, setfullName] = useState('');
  const [email, setemail] = useState('');
  const [gender, setgender] = useState('');
  const [dob, setdob] = useState('');
  const [address, setaddress] = useState('');
  const [mobile, setmobile] = useState('');


  useEffect(() => {

    const currentDob = userProfile.dob.substring(0, 10);
    
    setfullName(userProfile.fullName);
    setemail(userProfile.email);
    setgender(userProfile.gender);
    setdob(currentDob);
    setaddress(userProfile.address);
    setmobile(userProfile.mobile);
  }, [userProfile]);
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
          if (fullName === '') {
              errorObj.fullName = 'Your Full Name is Required';
              error = true;
          }
          if (email === '') {
            errorObj.email = 'email Id is Required';
            error = true;
          }
          if (gender === '') {
            errorObj.gender = 'Gender is Required';
            error = true;
          }
          if (dob === '') {
            errorObj.dob = 'Date of Birth is Required';
            error = true;
          }
          if (address === '') {
            errorObj.address = 'Address is Required';
            error = true;
          }
          if (mobile === '') {
            errorObj.mobile = 'Mobile Number is Required';
            error = true;
          }
         
          seterrors(errorObj);

          if(error){
            return
    }
    
    const profileData = { fullName, email, gender, dob, address, mobile };
    const _id = userProfile._id;
    dispatch(editUserProfile({ profileData, _id, token }));
  }
  
  useEffect(() => {
    if (success) {
      navigate('/app-profile');
    }
  }, [navigate, success]);


  if (userProfile) {
    
  return (
    <Fragment>
      <PageTitle
        activeMenu="Basic"
        motherMenu="Profile"
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
                  <h4 className="text-secondary">Personal Information</h4>
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-fullName"
                        >
                          Full Name
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-fullName"
                            name="val-fullName"
                            placeholder="Enter your Full Name.."
                            value={fullName}
                            onChange={(e) => setfullName(e.target.value)}
                          />
                          
                        </div>
                        {errors.fullName && <div className="text-danger fs-12">{errors.fullName}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-email"
                        >
                          email Id
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="email"
                            className="form-control"
                            id="val-email"
                            name="val-email"
                            placeholder="Enter a Valid email Id.."
                            value={email}
                            onChange={(e)=>setemail(e.target.value)}
                          />
                        </div>
                        {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-gender"
                        >
                          Gender 
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <select
                            className="form-control"
                            id="val-gender"
                            name="val-gender"
                            value={gender}
                            onChange={(e)=>setgender(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                          
                        </div>
                        {errors.gender && <div className="text-danger fs-12">{errors.gender}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-dob"
                        >
                          Date Of Birth
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                         
                            <input type="date" className="form-control" name="dob" id="dob" value={dob}  onChange={(e)=>setdob(e.target.value)}/>
                         
                        </div>
                        {errors.dob && <div className="text-danger fs-12">{errors.dob}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-residential"
                        >
                          Residential Address<span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <textarea
                            className="form-control"
                            id="val-residential"
                            name="val-residential"
                            rows="7"
                            placeholder="Enter Your Permanent Address"
                            value={address}
                            onChange={(e) => setaddress(e.target.value)}
                            
                          >
                            
                          </textarea>
                        </div>
                        {errors.address && <div className="text-danger fs-12">{errors.address}</div>}
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
                            placeholder="Enter your Mobile Number.."
                            value={mobile}
                            onChange={(e) => setmobile(e.target.value)}
                          />
                          
                        </div>
                        {errors.mobile && <div className="text-danger fs-12">{errors.mobile}</div>}
                      </div>

                      <div className="form-group mb-3 row">
                        <div className="col-lg-8 ms-auto">
                          <button type="submit" className="btn btn-secondary">
                            {loading ? <Spinner /> : "Submit"}
                          </button>
                        </div>
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
                          <PageTitle activeMenu="Basic" motherMenu="Profile" />
                          
                          <Row>
                          <Col xl={6} className="col-xxl-12">
                              <Card>
                                <Card.Header className="d-block">
                                  <Card.Title>Profile Status</Card.Title>
                                  
                                </Card.Header>
                                <Card.Body>
                                  
                                    <Alert
                                      variant='danger'
                                      className="solid alert-square"
                                    >
                                      <strong> User is not associated with any profile !!!</strong> Please Fill Up your Profile if you like.
                                    </Alert>
                                
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col xl={6} className="col-xxl-12">
                              <Card>
                                <Card.Body>
                                  <Link to="/form-add-profile"> Click Here to Fill Up your  Profile </Link>
                                </Card.Body>
                              
                              </Card>
                              
                            </Col>
                          </Row>
                        </Fragment>
                      )
                    }
};


export default  FormProfileEdit;

