import React from 'react';

// layouts
import NavHorizontal from '../layouts/navHorizontal'
import FooterHorizontal from '../layouts/FooterHorizontal';

// images
import serviceImg from '../images/pages/serviceimage.jpg';

const Services = () => {
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

                                                        <h1 className='text-secondary mb-5' style={{ fontWeight: "bolder" }}>Our Services</h1>
                                                        
                                                        <p>
                                                            At Ztyle, we're committed to connecting you with the best beauty professionals in your area.
                                                            Whether you're looking for a relaxing spa day or a quick touch-up, our platform offers a wide range of services to meet your needs.
                                                        </p>
                                                        <h4 className='text-info'>Discover the Best Salons and Spas</h4>
                                                        <p>
                                                            Browse through our extensive network of salons and spas, each carefully selected for their expertise and commitment to quality.
                                                            Find the perfect location based on your preferences, services offered, and proximity.
                                                        </p>
                                                        <h4 className='text-info'>Enjoy the Convenience of Home Service</h4>
                                                        <p>
                                                            Need a beauty treatment at home? Our platform allows you to book home services directly with the same talented professionals you'd find in salons and spas.
                                                            Enjoy the convenience of having your favorite treatments delivered to your doorstep.
                                                        </p>
                                                        <h4 className="text-info">Our Wide Range of Services Includes:</h4>
                                                        <p>
                                                            <ul>
                                                                <li> <strong>Hair Styling:</strong>Haircuts, coloring, styling, and treatments</li>
                                                                <li> <strong>Nail Care:</strong> Manicures, pedicures, and nail art</li>
                                                                <li> <strong>Facials:</strong> Deep cleansing, exfoliation, and hydration</li>
                                                                <li> <strong>Massages:</strong> Swedish, deep tissue, hot stone, and more</li>
                                                                <li> <strong>Waxing:</strong> Body and facial waxing</li>
                                                                <li> <strong>Makeup:</strong> Professional makeup application for any occasion</li>
                                                            </ul>
                                                        </p>
                                                        <h4 className="text-info">Book Your Appointment Today</h4>
                                                        <p>
                                                            Ready to elevate your beauty routine? Download our app or visit our website to explore our services, find your ideal salon or spa, and book your appointment with ease.
                                                            Let us help you discover the transformative power of professional beauty treatments.
                                                        </p>
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="card">
                                                    <div className="card-body pt-3">
                                                        <img src={serviceImg} alt="hero" className="img-fluid  mb-4 w-100 " />
                                                        <h4>Service with unparallel quality , for you</h4>
                                                        
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

export default Services