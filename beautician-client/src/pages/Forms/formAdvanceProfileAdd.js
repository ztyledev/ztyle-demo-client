import React, { Fragment, useState ,useEffect ,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Alert } from 'react-bootstrap';


// components
import PageTitle from "../../components/PageTitle";
import { ThemeContext } from "../../context/ThemeContext";
import swal from "sweetalert";
import Spinner from "../../components/Spinner/Spinner";

// actions
import {
  getBeauticianProfile,
  editBeauticianProfile
} from '../../store/beauticianProfile/beauticianProfileActions'

const FormAdvanceProfileAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { 

		changeSideBarStyle
		
	} = useContext(ThemeContext);
	useEffect(() => {

		changeSideBarStyle({ value: "modern", label: "Modern" });
		
	},[]);

 
  // auth redux state
  const { beauticianInfo, token } = useSelector(state => state.auth);
  
  // access the current profile
  useEffect(() => {
    dispatch(getBeauticianProfile({ email: beauticianInfo.email, token }));
  }, [beauticianInfo.email, dispatch, token]);
  
  // profile redux state
  const { loading, success, error, beauticianProfile } = useSelector(state => state.beauticianProfile);

  

  let errorsObj = { availableSlots: '' };
  const [errors, seterrors] = useState({errorsObj});
  
  // fields
  const [availableSlots, setavailableSlots] = useState([{ start: '', end: '' }]);
  
  const handleAvailableChange = (e, index) => {
    let { name, value } = e.target;
    let onChangeValue = [...availableSlots];
    onChangeValue[index][name] = value;
    setavailableSlots(onChangeValue);
        
  }
    const handleDeleteInput = (index) => {
      const newArray = [...availableSlots];     
      newArray.splice(index, 1);
      setavailableSlots(newArray);
    }
    const handleAddInput = () => {
      setavailableSlots([...availableSlots, { start: '', end: '' }]);
    }
    

  
  const handleSubmit=()=>{
    
    let error = false;
    const errorObj = { ...errorsObj };   
    if (availableSlots.length === 0) {
      errorObj.availableSlots = 'You need to enter atleast one slot';
      error = true;     
    }
                                                                               
    seterrors(errorObj);
    

    if (error) {       
      return;     
    }
                         
    const profileData = { availableSlots, advanceProfileStatus: true, profileCompletion: "100" };
    const id = beauticianProfile._id;
    dispatch(editBeauticianProfile({ profileData, id, token }));
           
        
  }

  // go to profile page on success
  useEffect(() => {
      if (success) {
        navigate('/app-profile');
      }
  }, [navigate, success]);

  // alert error
  useEffect(() => {
    if (error) {
      swal(error, "error");
    }
  }, [error]);


  if (beauticianProfile) {
  

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
                <h4 className="card-title">Enter Your Booking Slot Details</h4>
              </div>
              <div className="card-body">
                <div className="form-validation">
                  <div
                    className="form-valide"
                  
                  >
                    <h4 className="text-secondary"> Add Slots For Booking</h4>
                    <div className="row">
                      <div className="col-xl-6">
                        {
                          availableSlots.map((item, index) => (
                            <div className="form-group mb-3 row" key={index}>
                              <h5 className="text-info">Time Slot</h5>
                              <label
                                className="col-lg-4 col-form-label"
                                htmlFor="val-location"
                              >
                                Starting Time
                                <span className="text-danger">*</span>
                              </label>
                              <div className="col-lg-6">
                                <input
                                  type="time"
                                  className="form-control"
                                  name="start"
                                  placeholder="Like Haircut, Shave etc."
                                  value={item.start}
                                  onChange={(e) => handleAvailableChange(e, index)}
                                  
                                />
                              </div>
                              <label
                                className="col-lg-4 col-form-label"
                                htmlFor="val-location"
                              >
                                Ending Time
                                <span className="text-danger">*</span>
                              </label>
                              <div className="col-lg-6">
                                <input
                                  type="time"
                                  className="form-control"
                                  name="end"
                                  placeholder="Price in &#8377;"
                                  value={item.end}
                                  onChange={(e) => handleAvailableChange(e, index)}

                                />
                              </div>
                              <div>
                                {
                                  availableSlots.length > 1 && (
                                    <button className="btn btn-primary" onClick={() => handleDeleteInput(index)}>Delete</button>
                                  )
                                }
                                
                                {
                                  index === availableSlots.length - 1 && (
                                    <button className="btn btn-secondary" onClick={() => handleAddInput()}>Add</button>
                                  )
                                }
                              </div>
                            </div>
                          ))
                            
                        }
                        {errors.availableSlots && <div className="text-danger fs-12">{errors.availableSlots}</div>}
                                                                                        
                     
                        {/* form submit */}
                        <div className="form-group mb-3 row">
                          <div className="col-lg-8 ms-auto">
                            <button className="btn btn-secondary" onClick={handleSubmit}>
                              {loading ? <Spinner /> : "Submit"}                              
                            </button>
                          </div>
                        </div>

                                     
                      </div>
                      {/* end of the section */}
                    </div>
                  </div>
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
        <PageTitle activeMenu="Status" motherMenu="Profile" />
        
        <Row>
        <Col xl={6} className="col-xxl-12">
            <Card>
              <Card.Header className="d-block">
                <Card.Title>Profile Status</Card.Title>
                
              </Card.Header>
              <Card.Body>
                
                  <Alert
                    variant='info'
                    className="solid alert-square"
                  >
                    <strong> User is not associated with any profile !!!</strong> Please Fill Up your Basic Profile First.
                  </Alert>
              
              </Card.Body>
            </Card>
          </Col>
          <Col xl={6} className="col-xxl-12">
            <Card>
              <Card.Body>
                <Link to="/form-add-basic-profile"> Click Here to Fill Up your  Profile </Link>
              </Card.Body>
            
            </Card>
            
          </Col>
        </Row>
      </Fragment>
    )
  }
};



export default FormAdvanceProfileAdd;
