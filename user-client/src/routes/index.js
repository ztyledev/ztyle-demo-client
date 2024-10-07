import React, { useContext} from 'react'
import { Routes, Route } from 'react-router-dom';


/// styles
import "./index.css";
import "./chart.css";
import "./step.css";

/// import routes 

import { publicRoutes ,authProtectedRoutes} from './routes';

/// theme context

import {ThemeContext} from '../context/ThemeContext'

/// layouts

import Footer from '../layouts/Footer';
import  Nav  from '../layouts/nav';

const Markup = () => {
    
    const { menuToggle } = useContext(ThemeContext);

    // console.log(menuToggle);

    let path = window.location.pathname;

    path = path.split("/");
    path = path[path.length - 1];
    let pagePath = path.split("-").includes("page");
    

  return (
      <>
          <div
              id={`${!pagePath ? "main-wrapper" : ""}`}
              className={`${!pagePath ? "show" : "vh-100"}  ${
                  menuToggle ? "menu-toggle" : ""
                  }`}
          >
              {!pagePath && <Nav />}
              <div className={`${!pagePath ? "content-body" : ""}`}>
                  <div
                      className={`${!pagePath ? "container-fluid" : ""}`}
                      style={{ minHeight: window.screen.height - 60 }}
                  >
                      
    
                      <Routes>
                          {
                                publicRoutes.map((route, idx) => (
                                    <Route
                                        key={idx}
                                        path={`/${route.path}`}
                                        element={<route.element />}
                    
                                    />
                                ))
                            } 
                            {
                                authProtectedRoutes.map((route, idx) => (
                                    <Route
                                        key={idx}
                                        path={`/${route.path}`}
                                        element={<route.element />}
                                        
                                    />
                                ))
                                
                            }
              
                      </Routes>
                  </div>        
              </div>
              {!pagePath && <Footer />}
              
          </div>
          
      </>
  )
}

export default Markup
