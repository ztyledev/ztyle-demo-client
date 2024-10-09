import React, { Fragment, useContext, useState } from "react";
/// React router dom
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";


const NavHader = () => {
  const [toggle, setToggle] = useState(false);
  const { navigationHader, openMenuToggle, background } = useContext(
    ThemeContext
    );
    

  return (
    <div className="nav-header">
      <Link to="/dashboard" className="brand-logo">
        {background.value === "dark" || navigationHader !== "color_1" ? 
        (
            <Fragment>
                 <svg width="100" height="50" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="myGradient">
                      <stop offset="0%" stop-color="white" />
                      <stop offset="100%" stop-color="gray" />
                    </linearGradient>
                  </defs>
                  <text x="1" y="40" font-size="29" font-weight="bold" fill="url(#myGradient)">ztyle</text>
                </svg>
            </Fragment>
        ) 
        : 
        (
          <Fragment>
		  
              <svg width="100" height="50" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="myGradient">
                    <stop offset="0%" stop-color="black" />
                    <stop offset="100%" stop-color="grey" />
                  </linearGradient>
                </defs>
                <text x="0" y="40" font-size="35" font-weight="bold" fill="url(#myGradient)">ztyle</text>
              </svg>  

          </Fragment>
        )}
      </Link>

      <div
        className="nav-control"
        onClick={() => {
          setToggle(!toggle);
          openMenuToggle(toggle);
        }}
      >
        <div className={`hamburger ${toggle ? "is-active" : ""}`}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
    </div>
  );
};

export default NavHader;
