import React from 'react';

// layouts
import NavHorizontal from '../layouts/navHorizontal'
import Footer from '../layouts/Footer';

// images
import profile01 from '../images/profile/1.jpg';


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

                                                        <h1 className='text-secondary' style={{ fontWeight: "bolder" }}>SRS Matrimony : The Perfect Match, Made Easy </h1>
                                                        
                                                        <p>
                                                            Welcome to SRS Matrimony, your partner in finding a lifelong companion.
                                                            We understand the significance of finding the right match, and our platform is designed to make your search effortless and enjoyable. With a vast pool of verified profiles, advanced search criteria, and a user-friendly interface, we aim to bring together like-minded individuals who share similar values, interests, and goals. Whether you're looking for a friend, a soulmate, or a life partner, our site is dedicated to helping you find the perfect match. Start your journey with us today and discover a world of possibilities!
                                                        </p>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="card">
                                                    <div className="card-body pt-3">
                                                        <img src={profile01} alt="hero" className="img-fluid  mb-4 w-100 " />
                                                        <h4>A caring partner , Now nearer than you thought...</h4>

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
            <Footer />
        </div>
  )
}

export default LandingPage
