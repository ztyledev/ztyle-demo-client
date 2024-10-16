/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";
import { useScrollPosition } from "react-use-scroll-position";
import { ThemeContext } from "../../context/ThemeContext";

/// Image
//import profile from "../../../images/profile/pic1.jpg";
//import plus from "../../../images/plus.png";

class MM extends Component {
	  componentDidMount() {
		this.$el = this.el;
		this.mm = new Metismenu(this.$el);
	  }
	  componentWillUnmount() {
	  }
	render() {
		return (
			<div className="mm-wrapper">
				<ul className="metismenu" ref={(el) => (this.el = el)}>
					{this.props.children}
				</ul>
			</div>
		);
	}
}

const SideBar = () => {
  const {
    iconHover,
    sidebarposition,
    headerposition,
    sidebarLayout,
  } = useContext(ThemeContext);
  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);
	
	//sidebar icon Heart blast
	var handleheartBlast = document.querySelector('.heart');
        function heartBlast() {
            return handleheartBlast.classList.toggle("heart-blast");
        }
        handleheartBlast.addEventListener('click', heartBlast);
	
  }, []);
  let scrollPosition = useScrollPosition();
  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  /// Active menu
  let deshBoard = [
    "",
    "dashboard-dark",
    "guest-list",
    "guest-detail",
    "concierge",
    "room-list",
    "reviews",
    "task",
    "srs-matrimony",
  ],
    profiles = [
      "profiles-matching",
      "profiles-fresh",
      "profiles-sent-interest",
      "profiles-received-interest",
      "profiles-mutual-interest"
    ],
    account = [
      "account-status"
    ];
    
  return (
    <div
      className={`deznav ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? scrollPosition > 120
            ? "fixed"
            : ""
          : ""
      }`}
    >
      <PerfectScrollbar className="deznav-scroll">
        <MM className="metismenu" id="menu">
          <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="/page-ztyle-admin" >
              <i className="fa fa-home"></i>
              <span className="nav-text">Home</span>
            </Link>
     
          </li>
          <li className={`${profiles.includes(path) ? "mm-active" : ""}`}>
				    <Link className="has-arrow ai-icon" to="/page-about-us" >
					    <i className="fa fa-users"></i><span className="nav-text">About Us</span>
				    </Link>
          </li>
          <li className={`${profiles.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="/page-services" >
              <i className="fa fa-wrench"></i>
              <span className="nav-text">Our Services</span>
            </Link>
     
          </li>

          <li className={`${profiles.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="/page-srs-matrimony" >
              <i className="fa fa-user"></i>
              <span className="nav-text">Privacy Policy</span>
            </Link>
          </li>

           <li className={`${profiles.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="/page-srs-matrimony" >
              <i className="fa fa-user"></i>
              <span className="nav-text">Terms Of Use</span>
            </Link>
          </li>
          
          <li className={`${profiles.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="/page-srs-matrimony" >
              <i className="fa fa-credit-card"></i>
              <span className="nav-text">Refund Policy</span>
            </Link>
          </li>
          <li className={`${account.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="/page-register" >
              <i className="fa fa-user-plus"></i>
              <span className="nav-text">Register Your Account</span>
            </Link>
          </li>
          <li className={`${account.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="/page-login" >
              <i className="fa fa-user-circle"></i>
              <span className="nav-text">Sign In ToYour Account</span>
            </Link>
          </li>
          <li className={`${account.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="/page-contact" >
              <i className="fa fa-tty"></i>
              <span className="nav-text">Contact Us</span>
            </Link>
          </li>
          
          {/* <li className={`${app.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="/app-profile" >
              <svg
						  id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-white"
						  width={25} height={25} viewBox="0 0 24 24" fill="none"
						  stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
						>
						  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
						  <circle cx={12} cy={7} r={4} />
						</svg>
              <span className="nav-text">Your Profile</span>
            </Link>
          </li> */}
          {/* <li >
            <LogoutPage className="text-white"/>
            </li> */}

         
        </MM>
		<div className="copyright">
			<p><strong>Exiant Technologies</strong> © 2022 All Rights Reserved</p>
			<p className="fs-12">Made with <span className="heart"></span> by Exiant </p>
		</div>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
