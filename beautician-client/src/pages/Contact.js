import React from 'react'

// layouts
import NavHorizontal from '../layouts/navHorizontal'
import FooterHorizontal from '../layouts/FooterHorizontal';

// images
import contactimg from '../images/pages/contactimg.png';

const Contact = () => {
    const body = document.querySelector("body");
    body.setAttribute("data-layout", "horizontal");
  return (
    <div id='main-wrapper menu-toggle' className='show'>
            <NavHorizontal />
            <div className='content-body'>
                <div className='container-fluid' style={{ minHeight: window.screen.height - 60 }}>
                    <>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-xl-6">
                                                <div className="card">
                                                    <div className="card-body">

                                                        <h1 className='text-secondary mb-5' style={{ fontWeight: "bolder" }}>Our Contact Details</h1>
                                                        <h4 className="text-info"> <span className="me-2" > <i className="fa fa fa-map-marker"/></span> Address</h4>
                                                      <p>
                                                          EXIANT TECH PRIVATE LIMITED <br />
                                                          Building No 5.339, ISRO QTRS Road, <br />
                                                          Erumathala P.O Aluva, Ernakulam, <br />
                                                          Kerala, India, 683112 
                                                      </p>
                                                      <h4 className="text-info"> <span className="me-2" > <i className="fa fa-envelope" /></span> email</h4>
                                                      <p>
                                                          info@exianttech.com
                                                      </p>
                                                      <h4 className="text-info"> <span className="me-2" > <i className="fa fa-phone" /></span> phone</h4>
                                                      <p>
                                                          +91 484 2837374
                                                      </p>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="card">
                                                    <div className="card-body pt-3">
                                                        <img src={contactimg} alt="hero" className="img-fluid  mb-4" width="60%"/>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                </div>
            </div>
            <FooterHorizontal />
        </div>
  )
}

export default Contact