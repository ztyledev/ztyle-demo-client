import React from 'react';

// layouts
import NavHorizontal from '../layouts/navHorizontal'
import FooterHorizontal from '../layouts/FooterHorizontal';

// images
import profile01 from '../images/pages/landingpageimage.jpg';


const LandingPage = () => {

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

                                                        <h1 className='text-secondary' style={{ fontWeight: "bolder" }}>Unmatched Aesthetics - only with Ztyle </h1>
                                                        
                                                        <p>
                                                            Eliminate long wait times and scheduling challenges with Ztyle.
                                                            Our platform allows you to effortlessly book appointments at your preferred salons with just a few taps.
                                                            Whether you desire a fresh haircut, a rejuvenating spa experience, or a complete makeover, we have you covered.
                                                        </p>
                                                        <p>
                                                            Select from a curated list of top salons in your area, find a time that suits your schedule, and secure your appointment—all from the comfort of your home.
                                                            Experience the ultimate in convenience, style, and self-care with Ztyle.
                                            
                                                        </p>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="card">
                                                    <div className="card-body pt-3">
                                                        <img src={profile01} alt="hero" className="img-fluid  mb-4 w-100 " />
                                                        <h4>Beauty Bookings, Made Easy </h4>

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

export default LandingPage
