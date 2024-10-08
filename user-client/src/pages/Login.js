import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';

// actions
import { userLogin } from '../store/auth/authActions';
import { resetAuth } from '../store/auth/authSlice';


// image
import fulllogo from '../images/full_logo.png'

// components
import Spinner from '../components/Spinner/Spinner';

const Login = () => {
	
	const dispatch = useDispatch();
	
	const { loading, error } = useSelector(state => state.auth)
	

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// error object for validation
	let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
	
	// for password visibility
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

	const handleLogin = (e) => {
		
		e.preventDefault();

		let error = false;
        const errorObj = { ...errorsObj };
        if (email === '') {
            errorObj.email = 'email is Required';
            error = true;
        }
        if (password === '') {
            errorObj.password = 'Password is Required';
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

		const data = { email, password };
		dispatch(userLogin(data));
		
	}

	// for error message handling
	const [dispError, setdispError] = useState('');

	useEffect(() => {
		if (error) {
			swal(error, 'error');
			setdispError(error)
			dispatch(resetAuth());

		}
	}, [dispatch, error]);

    
  return (
		<div className="authincation d-flex flex-column flex-lg-row flex-column-fluid">
			<div className="login-aside text-center  d-flex flex-column flex-row-auto">
				<div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
					
					<h3 className="pt-5">Welcome back!</h3>
					<p>Find your perfect style at the perfect price ...</p>
				</div>
				<div className="aside-image" style={{backgroundImage:"url(" + fulllogo + ")"}}></div>
			</div>
			<div className="container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
				<div className="d-flex justify-content-center h-100 align-items-center">
					<div className="authincation-content style-2">
						<div className="row no-gutters">
							<div className="col-xl-12 tab-content">
								<div id="sign-in" className="auth-form   form-validation">
								  {dispError && (
										<div className='bg-red-300 text-danger border border-red-900 p-1 my-2'>
											{dispError}
										</div>
								  )}
								  
								  <form onSubmit={handleLogin} className="form-validate">
									  <h3 className="text-center mb-4 text-black">Sign in your account</h3>
									  <div className="form-group mb-3">
										  <label className="mb-1" htmlFor="val-email"><strong>Email</strong></label>
										  <div>
											  <input type="email" className="form-control"
												  value={email}
												  onChange={(e) => setEmail(e.target.value)}
												  placeholder="Type Your Email Address"
											  />
										  </div>
										  {errors.email && <div className="text-danger fs-12">{errors.email}</div>}						
									  </div>
									  <div className="form-group mb-3">
										  <label className="mb-1"><strong>Password</strong></label>
										  <div className='input-group'>
											  <input
												  type={type}
												  className="form-control"
												  value={password}
												  placeholder="Type Your Password"
												  onChange={(e) =>
													  setPassword(e.target.value)
												}   
											  />
										  <span className="input-group-text" style={{ background: "white" }} onClick={handleToggle}>
											  <i className={icon}></i>
											  </span>
										  </div>

										  {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
									  </div>
									  <div className="form-row d-flex justify-content-between mt-4 mb-2">
										  <div className="form-group mb-3">
											  <div className="custom-control custom-checkbox ml-1">
												  <input type="checkbox" className="form-check-input" id="basic_checkbox_1" />
												  <label className="form-check-label" htmlFor="basic_checkbox_1">Remember my preference</label>
												  <p>forgot password? <Link className="text-primary" to="/page-forgot-password">Click to Reset Your Password</Link></p>
											  </div>
										  </div>
									  </div>
									  <div className="text-center form-group mb-3">
										  <button type="submit" className="btn btn-secondary btn-block">
											  {loading ? <Spinner /> : "Log in"}
										  </button>
									  </div>
								  </form>
								  <div className="new-account mt-3">
									  <p>Don't have an account? <Link className="text-primary" to="/page-register">Sign up</Link></p>
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


export default Login;

