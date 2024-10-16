import React from "react";

import { Link } from "react-router-dom";

/// conncect 

/// Image

import { Dropdown } from "react-bootstrap";

const Header = (props) => {
	const onNote = props.onNote;



  var path = window.location.pathname.split("/");
  var name = path[path.length - 1].split("-");
 
  var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
  
  var finalName = filterName.includes("app")
    ? filterName.filter((f) => f !== "app")
    : filterName.includes("ui")
    ? filterName.filter((f) => f !== "ui")
    : filterName.includes("uc")
    ? filterName.filter((f) => f !== "uc")
    : filterName.includes("basic")
    ? filterName.filter((f) => f !== "basic")
    : filterName.includes("jquery")
    ? filterName.filter((f) => f !== "jquery")
    : filterName.includes("table")
    ? filterName.filter((f) => f !== "table")
    : filterName.includes("page")
    ? filterName.filter((f) => f !== "page")
    : filterName.includes("email")
    ? filterName.filter((f) => f !== "email")
    : filterName.includes("ecom")
    ? filterName.filter((f) => f !== "ecom")
    : filterName.includes("chart")
    ? filterName.filter((f) => f !== "chart")
    : filterName.includes("editor")
    ? filterName.filter((f) => f !== "editor")
    : filterName; 

	var c = finalName[0];

	var headerName = isNaN(c[0]) ? finalName : ["User Profile"];

	
  return (
    <div className="header">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
				<div
					className="dashboard_bar"
					style={{ textTransform: "capitalize" }}
				  >
					
					{headerName.join(" ").length === 0
					  ? "DashBoard"
					  : headerName.join(" ") === "dashboard dark"
					  ? "DashBoard "
					  : headerName.join(" ")}
					 
				</div> 	
				
            </div>
            <ul className="navbar-nav header-right main-notification">
				{/* <li className="nav-item">
					<div className="input-group search-area">
						<input type="text" className="form-control" placeholder="Search Here" />
						<span className="input-group-text"><Link to={"#"}><i className="flaticon-381-search-2"></i></Link></span>
					</div>
				</li> */}
				
				<Dropdown as="li" className="nav-item notification_dropdown ">
					<Dropdown.Toggle variant="" as="a" className="nav-link  ai-icon i-false c-pointer">
						<Link to='/page-about-us' className="text-primary" title="About-US">
							<span className="me-2" > <i className="fa fa-users"/></span>	
						</Link> 
						<div className="pulse-css"></div>
					</Dropdown.Toggle>
						  </Dropdown>
						  <Dropdown as="li" className="nav-item dropdown notification_dropdown">
					<Dropdown.Toggle variant="" as="a"
					  className="nav-link bell bell-link i-false c-pointer ai-icon"
					  onClick={() => onNote()}
					>
						<Link to='/page-services' className="text-primary" title="Services Provided">
							<span className="me-2" > <i className="fa fa-wrench"/></span>	
						</Link> 
						<div className="pulse-css"></div>
					</Dropdown.Toggle>
				  </Dropdown>
			  
				<Dropdown as="li" className="nav-item dropdown notification_dropdown ">
							  <Dropdown.Toggle className="nav-link i-false c-pointer ai-icon" variant="" as="a">
								  <Link to='/page-contact' className="text-primary" title="Contact-US">
									   <span className="me-2" > <i className="fa fa-tty"/></span>	
								  </Link> 
						{/* <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M2.15608 11.6592C0.937571 10.4299 0.253296 8.76839 0.253296 7.03607C0.253296 5.29415 0.944772 3.62306 2.17648 2.39134C3.4082 1.15963 5.0793 0.46814 6.82122 0.46814C8.56315 0.46814 10.2342 1.15963 11.466 2.39134L11.9149 2.84033L12.3639 2.39134C13.5956 1.15963 15.2655 0.46814 17.0075 0.46814C18.7506 0.46814 20.4205 1.15963 21.6522 2.39134C22.8839 3.62306 23.5766 5.29415 23.5766 7.03607C23.5766 8.76839 22.8923 10.4299 21.6726 11.6592L12.7625 21.0939C12.5428 21.3268 12.2355 21.4589 11.9149 21.4589C11.5944 21.4589 11.2871 21.3268 11.0674 21.0939L2.15608 11.6592ZM11.9149 18.5945L19.9799 10.0553L20.0039 10.0313C20.7974 9.23659 21.244 8.15974 21.244 7.03607C21.244 5.9124 20.7974 4.83556 20.0039 4.04083C19.2092 3.2461 18.1311 2.79951 17.0075 2.79951C15.885 2.79951 14.807 3.2461 14.0122 4.04083L12.7397 5.31456C12.2835 5.76955 11.5452 5.76955 11.0902 5.31456L9.81646 4.04083C9.02293 3.2461 7.94489 2.79951 6.82122 2.79951C5.69756 2.79951 4.62071 3.2461 3.82598 4.04083C3.03125 4.83556 2.58586 5.9124 2.58586 7.03607C2.58586 8.15974 3.03125 9.23659 3.82598 10.0313C3.83438 10.0397 3.84158 10.0469 3.84879 10.0553L11.9149 18.5945Z" fill="#1362FC"/>
						</svg> */}
						<div className="pulse-css"></div>
					</Dropdown.Toggle>	
					
				</Dropdown> 
			  
				<Dropdown as="li" className="nav-item dropdown header-profile">
					
						{/* <img src={defaultProfilePic} width={20} alt="" /> */}
								  {/* <div className="header-info ms-3"> */}
								  <Link to ='/page-login' title="login to your matrimony account">
									  <button className="btn btn-secondary">
										  <span className="me-2"> <i className="fa fa-user-circle" /></span>Login
									  </button>
									  
								  </Link>
							
									  
						{/* </div>  */}
					
					
				</Dropdown> 
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};


export default Header;
