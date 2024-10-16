import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';


//components
import Spinner from "../components/Spinner/Spinner";
import swal from 'sweetalert';

// actions
import { adminRegister } from '../store/auth/authActions';
import { resetAuth } from '../store/auth/authSlice';


const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // fields
  const [fullName, setfullName] = useState('')
  const [designation, setdesignation] = useState('');
  const [mobile, setmobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  let errorsObj = { fullName: '', designation: '', mobile: '', email: '', password: '' };
  const [errors, setErrors] = useState(errorsObj);

  // set the password visibility
  const [type, settype] = useState('password');
  const [icon, seticon] = useState('fa fa-eye-slash');
  
  const handleToggle = () => {
      
    if (type === 'password') {
      settype('text')
      seticon('fa fa-eye');
      
    }
    else {
      settype('password');
      seticon('fa fa-eye-slash');
    }

  }
  
  const handleRegister = (e) => {
    e.preventDefault()

    // front end validation
    let error = false;
    const errorObj = { ...errorsObj };
    if (fullName === '') {
      errorObj.fullName = 'Full Name is Required'
    }
    if (designation === '') {
      errorObj.designation = 'Designation is Required'
    }
    if (mobile === '') {
      errorObj.mobile = 'Mobile Number is Required'
    }
    if (email === '') {
      errorObj.email = 'email Is Required';
      error = true;
    }
    if (password === '') {
      errorObj.password = 'Password Is Required';
      error = true;
    }
		else if(password.length < 8){
			errorObj.password = 'password requires minimum of 8 characters';
            error = true;
		} 
		setErrors(errorObj);

        if (error) {
		
			return ;
		}
    
    const data = { fullName, designation, mobile, email, password };
    dispatch(adminRegister(data));
    

  }
  
  const { loading, success, error } = useSelector(state => state.auth)
  
  // handle error 
  const [dispError, setdispError] = useState('');

  useEffect(() => {
    if (error) {
      swal(error, 'error');
      setdispError(error);
      dispatch(resetAuth());
    }
    
  }, [dispatch, error]);
  
  // navigate to success page
  useEffect(() => {

    if (success && !error) {
      navigate('/page-register-success-next');
    }
    
  }, [error, navigate, success]);



  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">  
                      <Link to="/page-login">
                      <svg width="250" height="100" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="myGradient">
                              <stop offset="0%" stop-color="black" />
                              <stop offset="100%" stop-color="grey" />
                            </linearGradient>
                          </defs>
                          <text x="50" y="50" font-size="60" font-weight="bold" fill="url(#myGradient)">ztyle</text>
                        </svg>
                      </Link>
                      
                    </div>
                    <h4 className="text-center mb-4 ">Sign up your account</h4>
                    
                      
                   {dispError && (
                      <div className='bg-red-300 text-danger border border-red-900 p-1 my-2'>
                        {dispError}
                      </div>
                    )}
                    
                    <form onSubmit={handleRegister}>
                  
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Full Name</strong>
                        </label>
                        <input
                          value={fullName}
                          onChange={(e) => setfullName(e.target.value)}
                          className="form-control"
                          placeholder="Your Full Name"
                        />
                      </div>
                      {errors.fullName && <div className="text-danger fs-12">{errors.fullName}</div>}
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Designation</strong>
                        </label>
                        <select
                            className="form-control"
                            id="val-gender"
                            name="val-gender"
                            value={designation}
                            onChange={(e)=>setdesignation(e.target.value)}
                        >
                          <option value="">Please select</option>
                          <option value="director">Director</option>
                          <option value="associate director">Associate Director</option>
                          <option value="general manager">General Manager</option>
                          <option value="serior manager">Senior Manager</option>
                          <option value="manager">Manager</option>
                          <option value="secretary">Secretary</option>
                          <option value="administrative staff">Administrative Staff</option>
                          <option value="others">Others</option>
                        </select>

                      </div>
                      {errors.designation && <div className="text-danger fs-12">{errors.designation}</div>}
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Mobile Number</strong>
                        </label>
                        <input
                          value={mobile}
                          onChange={(e) => setmobile(e.target.value)}
                          className="form-control"
                          placeholder="Mobile Number"
                        />
                      </div>
                      {errors.mobile && <div className="text-danger fs-12">{errors.mobile}</div>}
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Email</strong>
                        </label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          placeholder="hello@example.com"
                        />
                      </div>
                      {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Password</strong>
                        </label>
                        <div className="input-group">
                          <input type={type}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            defaultValue="Password"
                        />
                          <span className="input-group-text" onClick={handleToggle} style={{ cursor: "pointer" }}>
                              <i className={icon}></i>
                          </span>
                        </div>
                        
                      </div>
                      {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-secondary btn-block"
                        >
                          {loading ? <Spinner /> : "Sign me up"}
                        </button>
                      </div>
                    </form>
                    <div className="new-account mt-3">
                      <p className="">
                        Already have an account?{" "}
                        <Link className="text-primary" to="/page-login">
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Register;

