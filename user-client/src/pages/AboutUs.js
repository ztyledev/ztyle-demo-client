import React from 'react'

// layouts
import NavHorizontal from '../layouts/navHorizontal'
import FooterHorizontal from '../layouts/FooterHorizontal';

// images
import aboutimg from '../images/pages/aboutimage.jpg';

const AboutUs = () => {
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

                                                        <h1 className='text-secondary mb-5' style={{ fontWeight: "bolder" }}>About Ztyle </h1>
                                                        
                                                      <p>
                                                          At Ztyle, we believe that everyone deserves to feel confident and beautiful in their own skin.
                                                          Our app is designed to make it easy for you to discover and book the best beauty services, from hair styling and manicures to massages and facials.
                                                          We're committed to connecting you with talented professionals who share your passion for self-care.
                                                      </p>
                                                      <p>
                                                          Our user-friendly app allows you to browse through a wide range of beauty services offered by top salons and spas in your area.
                                                          With just a few taps, you can search for specific treatments, read reviews from other customers, and book appointments that fit your schedule.
                                                          We prioritize convenience and quality, ensuring a seamless experience from start to finish.
                                                      </p>
                                                      <p>
                                                          Whether you're looking for a quick touch-up or a day of relaxation, Ztyle is your go-to destination for all things beauty.
                                                          We're dedicated to providing a platform that empowers you to prioritize self-care and look your best.
                                                          Join our community of beauty enthusiasts and discover the transformative power of professional services.
                                                      </p>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="card">
                                                    <div className="card-body pt-3">
                                                      <img src={aboutimg} alt="hero" className="img-fluid  mb-4 w-100 " />
                                                        <h4>We are here, for a better life for you...</h4>

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

export default AboutUs