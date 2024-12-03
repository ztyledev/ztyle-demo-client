import React, { Fragment, useState , useEffect,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import { Row, Card, Col, Alert } from "react-bootstrap";


// components
import { ThemeContext } from "../../context/ThemeContext";
import PageTitle from "../../components/PageTitle";
import Spinner from '../../components/Spinner/Spinner';
import swal from 'sweetalert';
import CheckBox from "../../components/CheckBox";

// data 
import { weekdata } from '../../data/weekdata';
import { languagedata } from '../../data/languagedata';


// actions
import {
  getBeauticianProfile,
  addBasicProfile
} from '../../store/beauticianProfile/beauticianProfileActions'

const FormBasicProfileAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { 
		
		changeSideBarStyle
		
	} = useContext(ThemeContext);
	useEffect(() => {

		changeSideBarStyle({ value: "modern", label: "Modern" });
  }, []);
  

  // beautician info redux states
  const { beauticianInfo, token } = useSelector(state => state.auth);

  // access beautician profile if any
  useEffect(() => {
    dispatch(getBeauticianProfile({ email: beauticianInfo.email, token }));
  }, [beauticianInfo.email, dispatch, token]);
  
  // profile redux states
  const { beauticianProfile, loading,success, error } = useSelector(state => state.beauticianProfile);
  

  // error object for validation
  let errorsObj = { fullName: '', shopId: '', mobile: '', email: '', gender: '', dob: '', position: '', specialty: '', yearsOfExperience: '', employmentStatus: '', holidaySchedule: '', languagesSpoken: '' };
  const [errors, seterrors] = useState({errorsObj});

  // fields
  const [fullName, setfullName] = useState(beauticianInfo.fullName);
  const [shopId, setshopId] = useState(beauticianInfo.shopId);
  const [mobile, setmobile] = useState(beauticianInfo.mobile);
  const [email, setemail] = useState(beauticianInfo.email);
  const [gender, setgender] = useState('');
  const [dob, setdob] = useState('');
  const [position, setposition] = useState('');
  const [specialty, setspecialty] = useState('');
  const [yearsOfExperience, setyearsOfExperience] = useState('');
  const [employmentStatus, setemploymentStatus] = useState('');
  const [holidaySchedule, setholidaySchedule] = useState(weekdata);
  const [languagesSpoken, setlanguagesSpoken] = useState(languagedata);



  const holidayScheduleHandler = (index) => {
    setholidaySchedule(
      holidaySchedule.map((day, currentIndex) =>
        currentIndex === index ?
          { ...day, checked: !day.checked }
          : day
      )

    )
  }

  const languagesSpokenHandler = (index) => {
    setlanguagesSpoken(
      languagesSpoken.map((language, currentIndex) =>
        currentIndex === index ?
          { ...language, checked: !language.checked }
          : language
      )
    )
  }
  

  const handleSubmit=(e)=>{
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (fullName === '') {
      errorObj.fullName = 'Full Name is Required';
      error = true;
    }
    if (shopId === '') {
      errorObj.shopId = 'Shop Id is Required';
      error = true;
    }
    if (mobile === '') {
      errorObj.mobile = 'Mobile Number is Required';
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
    if (position === '') {
      errorObj.position = "Position is Required";
      error = true;
    }
    if (specialty === '') {
      errorObj.specialty = "Specialty is Required";
      error = true;
    }
    if (yearsOfExperience === '') {
      errorObj.yearsOfExperience = 'Enter Your Experience In Years'
      error = true;
    }
    if (employmentStatus === '') {
      errorObj.employmentStatus = "Employment Status is Required"
      error = true;
    }
    if (holidaySchedule.length === 0) {
      errorObj.holidaySchedule = 'At Least Take One Holiday'
      error = true;
    }
    if (languagesSpoken.length ===0) {
      errorObj.languagesSpoken = 'At least enter one Language';
      error = true;
    }
         
    seterrors(errorObj);

    if(error){
      return
    }
          
    const profileData = { fullName, shopId, mobile, email, gender, dob, position, specialty, yearsOfExperience, employmentStatus, holidaySchedule, languagesSpoken, profileCompletion: "90" }
    
    dispatch(addBasicProfile({ profileData, token }));
    
    
  }

  useEffect(() => {
    if (success) {
      navigate('/app-profile');
    }

  }, [navigate, success]);
  // alert the error
  useEffect(() => {
    if (error) {
      swal(error, "error");

    }
  }, [error]);
  if (!beauticianProfile) {
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
                            id="val-fulltName"
                            name="val-fullName"
                            placeholder="Enter your Full Name.."
                            value={fullName}
                            onChange={(e)=> setfullName(e.target.value) }
                          />
                          
                        </div>
                        {errors.fullName && <div className="text-danger fs-12">{errors.fullName}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-shopId"
                        >
                          Shop Id <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-shopId"
                            name="val-shopId"
                            placeholder="Shop Id Of Your Shop"
                            value={shopId}
                            onChange={(e)=>setshopId(e.target.value)}
                          />
                        </div>
                        {errors.shopId && <div className="text-danger fs-12">{errors.shopId}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-mobile"
                        >
                          Mobile Number <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-mobile"
                            name="val-mobile"
                            placeholder="Your Mobile Number"
                            value={mobile}
                            onChange={(e)=>setmobile(e.target.value)}
                          />
                        </div>
                        {errors.shopId && <div className="text-danger fs-12">{errors.shopId}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-emailId"
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
                          htmlFor="val-confirm-password"
                        >
                          Date Of Birth
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                         
                            <input type="date" className="form-control" name="dob" id="dob" value={dob}  onChange={(e)=>setdob(e.target.value)}/>
                         
                        </div>
                        {errors.dob && <div className="text-danger fs-12">{errors.dob}</div>}                       
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
                      <h4 className="text-secondary">Basic Info </h4>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-position"
                        >
                          Position
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-position"
                            name="val-position"
                            placeholder="Stylist,Hair Dresser,Barber etc"
                            value={position}
                            onChange={(e)=>setposition(e.target.value)}
                          />
                        </div>
                        {errors.position && <div className="text-danger fs-12">{errors.position}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-specialty"
                        >
                          Specialty
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-specialty"
                            name="val-specialty"
                            placeholder="Salon Services, Make Up, Nail Services etc"
                            value={specialty}
                            onChange={(e)=>setspecialty(e.target.value)}
                          />
                        </div>
                        {errors.specialty && <div className="text-danger fs-12">{errors.specialty}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-yearsOfExperience"
                        >
                          Experience In Years
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-yearsOfExperience"
                            name="val-yearsOfExperience"
                            placeholder="Enter Your Experience In Years"
                            value={yearsOfExperience}
                            onChange={(e) => setyearsOfExperience(Number(e.target.value))}
                          />
                        </div>
                        {errors.yearsOfExperience && <div className="text-danger fs-12">{errors.yearsOfExperience}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-employmentStatus"
                        >
                          Employment Status 
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <select
                            className="form-control"
                            id="val-employmentStatus"
                            name="val-employmentStatus"
                            value={employmentStatus}
                            onChange={(e)=>setemploymentStatus(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value="Self Employed">Self Employed</option>
                            <option value="Full Time Employee">Full Time Employee</option>
                            <option value="Part Time Employee">Part Time Employee</option>
                            <option value="Others">Others</option>
                          </select>
                          
                        </div>
                        {errors.employmentStatus && <div className="text-danger fs-12">{errors.employmentStatus}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <div className="col-xl-6 col-lg-6">
                          <div className="card">
                            <label
                            className="col-lg-4 col-form-label"
                            htmlFor="val-holidaySchedule"
                            >
              
                             Holiday Schedule
                            </label>
              
                            <div className="card-body">
                              <div className="basic-form">
                                
                                  <div className="form-group">
                                  {
                                    holidaySchedule.map((day, index) => (
                                      <CheckBox
                                        key={day.name}                           
                                        isChecked={day.checked}
                                        checkHandler={() => holidayScheduleHandler(index)}
                                        label={day.name}
                                        index={index}                             
                                      />
                                  ))  
                                  }
                                  
                                  </div>
                              </div>
                            </div>
                          </div>
                          {errors.holidaySchedule && <div className="text-danger fs-12">{errors.holidaySchedule}</div>}
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6">
                        <div className="card">
                          <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-bloodGroup"
                          >
            
                            Languages Known
                          </label>
            
                          <div className="card-body">
                            <div className="basic-form">                              
                                <div className="form-group">
                                {
                                  languagesSpoken.map((language, index) => (
                                    <CheckBox
                                      key={language.name}
                                      isChecked={language.checked}
                                      checkHandler={() => languagesSpokenHandler(index)}
                                      label={language.name}
                                      index={index}                                
                                    />
                                  ))
                                }                               
                                </div>
                            </div>
                          </div>
                        </div>
                        {errors.languagesSpoken && <div className="text-danger fs-12">{errors.languagesSpoken}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <div className="col-lg-8 ms-auto">
                          <button type="submit" className="btn btn-secondary">
                            {loading ? <Spinner /> : "Submit"}
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
                          <PageTitle activeMenu="Basic" motherMenu="Profile" />
                          
                          <Row>
                          <Col xl={6} className="col-xxl-12">
                              <Card>
                                <Card.Header className="d-block">
                                  <Card.Title>Profile Status</Card.Title>
                                  
                                </Card.Header>
                                <Card.Body>
                                  
                                    <Alert
                                      variant='secondary'
                                      className="solid alert-square"
                                    >
                                      <strong> Basic Profile already exists for this Beautician !!!</strong> Please Edit your Profile if you like.
                                    </Alert>
                                
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col xl={6} className="col-xxl-12">
                              <Card>
                                <Card.Body>
                                  <Link to="/form-edit-basic-profile"> Click Here to Edit your  Profile </Link>
                                </Card.Body>
                              
                              </Card>
                              
                            </Col>
                          </Row>
                        </Fragment>
                      )
                    }
};

export default FormBasicProfileAdd;
