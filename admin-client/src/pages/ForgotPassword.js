import React from "react";
import { Link } from "react-router-dom";
// image
import logosrs from '../images/svg/srslogo.svg';
const ForgotPassword = () => {
  
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
							<img src={logosrs} alt="logo" width="290" height="35" viewBox="0 0 336 41" fill="none"/>
						</Link>
                    </div>
                    <h4 className="text-center mb-4 ">Forgot Password</h4>
                    <form onSubmit={''} className="form-validate">
                      <div className="form-group">
                        <label className="">
                          <strong>Email</strong>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          defaultValue="hello@example.com"
                        />
                      </div>
                      <div style={{marginTop:"1rem" }}>

                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          SUBMIT
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

