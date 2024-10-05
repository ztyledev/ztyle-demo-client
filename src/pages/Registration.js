import React,{useState} from "react";
import { Link } from "react-router-dom";


// image
import logosrs from '../images/svg/srslogo.svg'; 

const Register = () => {
    const [email, setEmail] = useState('');
    // let errorsObj = { email: '', password: '' };
    // const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('');

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
                        <img width="290" height="35" viewBox="0 0 336 41" fill="none" src={logosrs} alt="" />
                      </Link>
                      
                    </div>
                    <h4 className="text-center mb-4 ">Sign up your account</h4>
                    
                      
                  
					{/* {"props.errorMessage" && (
						<div className=''>
							{"props.errorMessage"}
						</div>
					)} */}
					{/* {"props.successMessage" && (
						<div className=''>
							{"props.successMessage"}
						</div>
					)} */}
                    <form onSubmit={""}>
                      
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
					  {/* {errors.email && <div className="text-danger fs-12">{errors.email}</div>} */}
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Password</strong>
                        </label>
                        <input type="password"
							value={password}
							onChange={(e) =>
								setPassword(e.target.value)
							}
                          className="form-control"
                          defaultValue="Password"
                        />
                      </div>
					  {/* {errors.password && <div className="text-danger fs-12">{errors.password}</div>} */}
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Sign me up
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

