import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';


// components
import Spinner from '../components/Spinner/Spinner'
import swal from 'sweetalert';

// actions
import { requestResetPassword } from '../store/auth/authActions';
import { resetAuth } from '../store/auth/authSlice';


const ForgotPassword = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message } = useSelector(state => state.auth);

  // error object for validation
  let errorsObj = { email: '' };
  const [errors, seterrors] = useState({ errorsObj });

  // field
  const [email, setemail] = useState('');


  const handleForgotPassword = (e) => {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };

    if (email === '') {
      
      errorObj.email = 'email is required';
      error = true;
    }

    seterrors(errorObj);
    if (error) {
      return
    }

    dispatch(requestResetPassword({ email }));
    
  }
   // redirect to success page
  useEffect(() => {
    if (message === "success") {
      navigate('/page-password-mailsend-status');

    }
  }, [message, navigate]);
  
  // error handling 
  const [dispError, setdispError] = useState('');

  useEffect(() => {
    if (error) {
      swal(error, 'error');
      setdispError(error);
      dispatch(resetAuth());
    }
  }, [dispatch, error]);
  
  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        {" "}
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <Link to="/login">
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
                    <h4 className="text-center mb-4 ">Forgot Password</h4>
                    {
                      dispError && (
                        <div className='bg-red-300 text-danger border border-red-900 p-1 my-2'>
                          {dispError}
                        </div>
                      )
                    }
                    <form onSubmit={handleForgotPassword} className="form-validate">
                      <div className="form-group">
                        <label className="">
                          <strong>Email</strong>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                          className="form-control"
                          placeholder="hello@example.com"
                        />
                      </div>
                      {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                      <div style={{marginTop:"1rem" }}>

                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-secondary btn-block"
                        >
                          {loading ? <Spinner /> : "SUBMIT"}
                        </button>
                      </div>
                    </form>
                    <div className="new-account mt-3">
										<p>Back to <Link className="text-primary" to="/page-login">Log in</Link></p>
										
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

export default ForgotPassword;

