import React, { Fragment, useEffect, useState, useContext } from "react";
import { Button, Dropdown, Modal,Row, Card, Col, Alert,Badge, Media} from "react-bootstrap";
import { Link } from "react-router-dom";

import { ThemeContext } from "../../../context/ThemeContext";

// import url

// import action


//** Import Image */
import profile01 from "../../../images/profile/1.jpg";
import profile02 from "../../../images/profile/2.jpg";
import profile03 from "../../../images/profile/3.jpg";
import profile04 from "../../../images/profile/4.jpg";
import profile05 from "../../../images/profile/5.jpg";
import profile06 from "../../../images/profile/6.jpg";
import profile07 from "../../../images/profile/7.jpg";
import profile08 from "../../../images/profile/8.jpg";
import profile09 from "../../../images/profile/9.jpg";
import defaultProfile from "../../../images/avatar/defaultProfilePic.png";
import PageTitle from "../../../components/PageTitle";


const AppProfile = () => {
  
  const { 
	changeSideBarStyle
	
} = useContext(ThemeContext);
useEffect(() => {
	
	changeSideBarStyle({ value: "modern", label: "Modern" });
},[]);

  const [activeToggle, setActiveToggle] = useState("basicProfile");
  const [sendMessage, setSendMessage] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const [cameraModal, setCameraModal] = useState(false);
  const [linkModal, setLinkModal] = useState(false);
  const [replayModal, setReplayModal] = useState(false);

  const [profilePic, setprofilePic] = useState('');

  	

  const [basicModal, setBasicModal] = useState(false);


  const handleDelete=()=>{
	
  }
   
  const [isAdditionalInfo, setisAdditionalInfo] = useState(false);
//   const {aboutMe,countryLiving,currentLocation,occupation,annualIncome,nativePlace,diet,smoking,drinking, family,education,residential,contact } =userProfile;

  
  const [errorMessage, seterrorMessage] = useState('');
  const [isProfilePicEdit, setisProfilePicEdit] = useState(true);
  const [image, setimage] = useState('')

  
  const handleSubmit=()=>{
    if(image==='' || image===null || image===undefined){
		seterrorMessage('please select a profile pic ')
	}
	else{
		seterrorMessage('');
		
	}
  }

  
  if(1){

 
  return (
    <Fragment>
      <PageTitle activeMenu="Profile" motherMenu="App" />

      <div className="row">
        <div className="col-lg-12">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head">
              <div className="photo-content ">
                {/* <div className="cover-photo rounded"></div> */}
              </div>
              <div className="profile-info">
                <div className="profile-photo">
                  <img
                    src={profilePic||defaultProfile}
                    className="img-fluid rounded-circle"
                    alt="profile"
                  />
                </div>
                <div className="profile-details">
                  <div className="profile-name px-3 pt-2">
                    <h4 className="text-primary mb-0">{'firstName'} &nbsp; {'lastName'}</h4>
                    <p>{ 'religion'} &nbsp; {'caste'}</p>
                  </div>
                  <div className="profile-email px-2 pt-2">
                    <h4 className="text-muted mb-0">{'email'}</h4>
                    <p>Email</p>
                  </div>
                  <Dropdown className="dropdown ms-auto">
                    <Dropdown.Toggle
                      variant="primary"
                      className="btn btn-primary light sharp i-false"
                      data-toggle="dropdown"
                      aria-expanded="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        //    xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x="0" y="0" width="24" height="24"></rect>
                          <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                          <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                          <circle fill="#000000" cx="19" cy="12" r="2"></circle>
                        </g>
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                      <Dropdown.Item className="dropdown-item" onClick={()=>setisProfilePicEdit(true)}>
                        <i className="fa fa-user-circle text-primary me-2" />
                        change  profile pic 
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-users text-primary me-2" />
                        Add to close friends
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-plus text-primary me-2" />
                        Add to group
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-ban text-primary me-2" />
                        Block
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
				  
                </div>
				
              </div>
            </div>
			{ isProfilePicEdit ?
			<div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-image"
                        >
                          Select Your Profile Pic
                          <span className="text-danger">*</span>
                        </label>
                        <div 
						// className="col-lg-1"
						>
                          
						  {/* <FileBase id="val-image" name="val-image" type="file" multiple={false} value={image} onDone={({ base64 }) => setimage(base64)} /> */}
						  <Button type="submit"  as="a" href="#" className="btn btn-primary mb-1 ms-1" onClick={handleSubmit}>Submit </Button>
                          
                        </div>
                        {errorMessage && <div className="text-danger fs-12">{errorMessage}</div>}
            </div> : ""
				
						}		
          </div>		  
        </div>
		
      </div>
      <div className="row">
        <div className="col-xl-4">
			<div className="row">
				<div className="col-lg-12">
					<div className="card">
						<div className="card-body">
							<div className="profile-statistics">
								<div className="text-center">
									<div className="row">
										<div className="col">
											<h3 className="m-b-0">150</h3><span>Follower</span>
										</div>
										<div className="col">
											<h3 className="m-b-0">140</h3> <span>Place Stay</span>
										</div>
										<div className="col">
											<h3 className="m-b-0">45</h3> <span>Reviews</span>
										</div>
									</div>
									<div className="mt-4">
										<Link	to="/post-details"	className="btn btn-primary mb-1 me-1">Follow</Link>
										<Button as="a" href="#" className="btn btn-primary mb-1 ms-1" onClick={() => setSendMessage(true)}>Send Message</Button>
									</div>
								</div>
							  {/* send Modal */}
								<Modal className="modal fade" show={sendMessage}>
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title">Send Message</h5>
											<Button variant="" type="button" className="btn-close" data-dismiss="modal" onClick={() => setSendMessage(false)}>
												
											</Button>
										</div>
										<div className="modal-body">
											<form className="comment-form" onSubmit={(e) => { e.preventDefault(); setSendMessage(false); }}>
												<div className="row">
													<div className="col-lg-6">
														<div className="form-group mb-3">
															<label htmlFor="author" className="text-black font-w600">  Name <span className="required">*</span> </label>
															<input type="text" className="form-control" defaultValue="Author" name="Author" placeholder="Author" />
														</div>
													</div>
													<div className="col-lg-6">
														<div className="form-group mb-3">
															<label htmlFor="email" className="text-black font-w600"> Email <span className="required">*</span></label>
															<input type="text" className="form-control" defaultValue="Email" placeholder="Email" name="Email"/>
														</div>
													</div>
													<div className="col-lg-12">
														<div className="form-group mb-3">
															<label htmlFor="comment" className="text-black font-w600">Comment</label>
															<textarea rows={8} className="form-control" name="comment" placeholder="Comment" defaultValue={""}/>
														</div>
													</div>
													<div className="col-lg-12">
														<div className="form-group mb-3">
															<input type="submit" value="Post Comment" className="submit btn btn-primary" name="submit"/>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
								</Modal>
							</div>
						</div>
					</div>
				</div>	
				<div className="col-lg-12">
					<div className="card">
						<div className="card-header border-0 pb-0">
							<h5 className="text-primary">Today Highlights</h5>
						</div>	
						<div className="card-body pt-3"	>	
							<div className="profile-blog ">
								<img  src={profile01}  alt="profile" className="img-fluid  mb-4 w-100 " />
								<Link to="/post-details"> <h4>Darwin Creative Agency Theme</h4> </Link>
								<p className="mb-0">
									A small river named Duden flows by their place and supplies
									it with the necessary regelialia. It is a paradisematic
									country, in which roasted parts of sentences fly into your
									mouth.
								</p>
							</div>
						</div>	
					</div>
				</div>
				<div className="col-lg-12">
					<div className="card">
						<div className="card-header border-0 pb-0">
							<h5 className="text-primary ">Interest</h5>
						</div>
						<div className="card-body pt-3">
							<div className="profile-interest ">
									<div className="row sp4">
										<div className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col mb-1">
											<a href={profile02}> <img src={profile02} alt="profileImage" className="img-fluid" /> </a>
										</div>
										<div className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col mb-1">
											<a href={profile03}> <img src={profile03} alt="profile" className="img-fluid"/></a>
										</div>
										<div className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col mb-1">
											<a href={profile04}><img src={profile04} alt="profile" className="img-fluid" /> </a>
										</div>
										<div className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col mb-1">
											{" "}
											<a href={profile02}><img src={profile02} alt="profile" className="img-fluid" /> </a>
										</div>
										<div className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col mb-1">
											<a href={profile03} className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col" >
												<img src={profile03} alt="profile"	className="img-fluid"/>	
											</a>
										</div>
										<div className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col mb-1">
											<a href={profile04}	className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col">
												<img  src={profile04} alt="profile"	className="img-fluid"/>
											</a>
										</div>
									</div>
								
							</div>
						</div>	
					</div>
				</div>	
				<div className="col-lg-12">
					<div className="card">
						<div className="card-header border-0 pb-0">
							<h5 className="text-primary">Our Latest News</h5>
						</div>	
						<div className="card-body pt-3">
							<div className="profile-news">
							  <div className="media pt-3 pb-3">
								<img src={profile05} alt="" className="me-3 rounded" width={75}/>
								<div className="media-body">
									<h5 className="m-b-5">
										<Link to="/post-details" className="text-black">
											Collection of textile samples
										</Link>
									</h5>
									<p className="mb-0">I shared this on my fb wall a few months back, and I thought. </p>
								</div>
							  </div>
							  <div className="media pt-3 pb-3">
								<img src={profile06} alt=""  className="me-3 rounded" width={75}/>
								<div className="media-body">
									<h5 className="m-b-5">
										<Link to="/post-details" className="text-black">
										Collection of textile samples
										</Link>
									</h5>
									<p className="mb-0">
										I shared this on my fb wall a few months back, and I
										thought.
									</p>
								</div>
							  </div>
							  <div className="media pt-3 ">
								<img src={profile07} alt="" className="me-3 rounded" width={75} />
								<div className="media-body">
									<h5 className="m-b-5">
										<Link to="/post-details" className="text-black">
											Collection of textile samples
										</Link>
									</h5>
									<p className="mb-0">
										I shared this on my fb wall a few months back, and I thought.
									</p>
								</div>
							  </div>
							</div>
						</div>	
					</div>
				</div>	
			</div>	
		</div>	
        <div className="col-xl-8">
          <div className="card">
            <div className="card-body">
              <div className="profile-tab">
                <div className="custom-tab-1">
						<ul className="nav nav-tabs">
							
							<li className="nav-item" onClick={() => setActiveToggle("basicProfile")}>
								<Link to="#basic-profile"  data-toggle="tab" className={`nav-link ${ activeToggle === "basicProfile" ? "active show" : ""}`}>Basic Profile</Link>
							</li>
							<li className="nav-item" onClick={() => setActiveToggle("advancedInfo")}>
								<Link to="#advanced-info"  data-toggle="tab" className={`nav-link ${ activeToggle === "advancedInfo" ? "active show" : ""}`}>Advanced Info</Link>
							</li>
							<li className="nav-item">
								<Link to="#profile-settings" data-toggle="tab" onClick={() => setActiveToggle("setting")} className={`nav-link ${ activeToggle === "setting" ? "active show" : ""}`}>Profile Setting</Link>
							</li>
							<li className="nav-item" onClick={() => setActiveToggle("posts")}>
								<Link to="#my-posts" data-toggle="tab" className={`nav-link ${ activeToggle === "posts" ? "active show" : ""}`}>Posts</Link>
							</li>
						</ul>
					<div className="tab-content">
					<div id="basicProfile" className={`tab-pane fade ${ activeToggle === "basicProfile" ? "active show" : ""}`}>
						<div className="profile-about-me">
							<div className="pt-4 border-bottom-1 pb-3">
								<h4 className="text-primary mb-4">
									Personal Information
								</h4>
								<div className="row mb-2">
									<div className="col-3">
										<h5 className="f-w-500"> Name<span className="pull-right">:</span></h5>
									</div>
									<div className="col-9">
										<span>{'firstName'} &nbsp; {'lastName'}</span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-3">
										<h5 className="f-w-500">Email<span className="pull-right">:</span></h5>
									</div>
									<div className="col-9">
										<span>{'email'}</span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-3">
										<h5 className="f-w-500">  Date of Birth <span className="pull-right">:</span></h5>
									</div>
									<div className="col-9">
										<span>{'dobDay'} - {'dobMonth'} - {'dobYear'}</span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-3">
										<h5 className="f-w-500"> Religion <span className="pull-right">:</span></h5>
									</div>
									<div className="col-9">
										<span>{'religion'}</span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-3">
										<h5 className="f-w-500">  Caste <span className="pull-right">:</span></h5>
									</div>
									<div className="col-9">
										<span>{'caste'}</span>
									</div>
								</div>
							</div>
							
							
							<div className="pt-4 border-bottom-1 pb-3">
								<h4 className="text-primary mb-4">
									Physical Info
								</h4>
								<div className="row mb-2">
									<div className="col-3">
										<h5 className="f-w-500"> Height<span className="pull-right">:</span></h5>
									</div>
									<div className="col-9">
										<span>{'height'} cm </span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-3">
										<h5 className="f-w-500"> Weight <span className="pull-right">:</span></h5>
									</div>
									<div className="col-9">
										<span>{'weight'} kg</span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-3">
										<h5 className="f-w-500">  Complexion <span className="pull-right">:</span></h5>
									</div>
									<div className="col-9">
										<span>{'complexion'}</span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-3">
										<h5 className="f-w-500"> Body Type <span className="pull-right">:</span></h5>
									</div>
									<div className="col-9">
										<span>{'bodytype'}</span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-3">
										<h5 className="f-w-500">  Physical Status <span className="pull-right">:</span></h5>
									</div>
									<div className="col-9">
										<span>{'physicalStatus'}</span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-3">
										<h5 className="f-w-500">  Blood Group <span className="pull-right">:</span></h5>
									</div>
									<div className="col-9">
										<span>{'bloodGroup'}</span>
									</div>
								</div>
							</div>
							<div className="profile-lang  mb-5">
								<div className="pt-4 border-bottom-1 pb-3">
									<h4 className="text-primary mb-2">Language Details</h4>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">  Mothertongue  <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{'mothertongue'}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500"> Languages Known <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												{/* { languages.map((language)=><span  key={language}> {language} , </span>)} */}
												
											</div>
											
										</div>
									</div>
								</div>
						</div>
						
					</div>
						
						
						<div id="advanced-info" className={`tab-pane fade ${ activeToggle === "advancedInfo" ? "active show" : ""}`}>
							{
							1 ? 
							<div>
								
									<div className="profile-about-me">
										<div className="pt-4 border-bottom-1 pb-3">
											<h4 className="text-primary">About Me</h4>
											<p className="mb-2">
												{'aboutMe'}
											</p>
											
										</div>
									</div>
									
									
									<div className="profile-about-me">
									<div className="pt-4 border-bottom-1 pb-3">
										<h4 className="text-primary mb-4">
											More Info About Yourself
										</h4>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500"> Country Of Living<span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{'countryLiving'}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Place Of Birth <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{'nativePlace'}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">  Current Location <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{'currentLocation'}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Diet<span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{'diet'}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">  Smoking <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{'smoking' ? 'Yes':'No'}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Drinking<span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{'drinking'}</span>
											</div>
										</div>
										</div>
									</div>
									<div className="profile-about-me">
									<div className="pt-4 border-bottom-1 pb-3">
										<h4 className="text-primary mb-4">
										Occupation and Family Details
										</h4>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500"> Occupation <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{'occupation'}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Annual Income <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>Rs. {'annualIncome'}/- </span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">  About My Family <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{'family[0].aboutMyFamily'}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Father's Occupation<span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{'family[0].occupationFather'}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">  Mother's Occupation <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{'family[0].occupationMother'}</span>
											</div>
										</div>
										</div>
									</div>
									<div className="profile-about-me">
									<div className="pt-4 border-bottom-1 pb-3">
										<h4 className="text-primary mb-4">
										Educational Details
										</h4>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500"> Highest Education<span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{'education[0].course'}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Corresponding Discipline<span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{'education[0].discipline'} </span>
											</div>
										</div>
										
										</div>
									</div>
									<div className="profile-about-me">
									<div className="pt-4 border-bottom-1 pb-3">
										<h4 className="text-primary mb-4">
										Contact Information
										</h4>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500"> Residential Address<span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{'residential'}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Contact Number <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{'contact.contact1'} </span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Additional Contact Number <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{'contact.contact2'} </span>
											</div>
										</div>
										
										</div>
									</div>
  									
							</div>
							: <div> 
								 <Row>
									<Col xl={6} className="col-xxl-12">
										<Card>
											<Card.Header className="d-block">
											<Card.Title>Profile Status</Card.Title>
											
											</Card.Header>
											<Card.Body>
											
												<Alert
												variant='primary'
												className="solid alert-square"
												>
												<strong> Your Advance Info is Empty !!!</strong> Please Fill up the same.
												</Alert>
											
											</Card.Body>
										</Card>
									</Col>
										<Col xl={6} className="col-xxl-12">
											<Card>
												<Card.Body>
													<Link to="/form-add-advance-info"> Click Here to Fill up Advance Info </Link>
												</Card.Body>
											
											</Card>
											
										</Col>
								</Row>
							</div>
						}	
						</div>
						
						<div id="profile-settings" className={`tab-pane fade ${ activeToggle === "setting" ? "active show" : ""}`}>
							<Row>
							<Card>
            <Card.Header className="d-block">
              <Card.Title>Manage Your Profile</Card.Title>
              <p className="mb-0 subtitle">
                here you can manage your  <code>profile </code> as editing or deleting completely.
              </p>
            </Card.Header>
            <Card.Body>
                <Alert
                  variant="success"
                  className="alert-dismissible solid fade show"
                >
                  <strong> Edit Your Basic Profile</strong>{" "} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  
                        <Link style={{color:"white"}} to="/form-edit-basic-profile">
                            click here to edit your basic profile
                        </Link>
                  
                </Alert>
              
            </Card.Body>
			{ 1 ?
			<Card.Body>
                <Alert
                  variant="info"
                  className="alert-dismissible solid fade show"
                >
                  <strong> Edit Your Advanced Profile</strong>{" "} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 
                    <Link style={{color:"white"}} to="/form-edit-advance-info"> click here to edit your advanced profile </Link> 
                  
                </Alert>
              
            </Card.Body>
  						: ""}
			<Card.Body>
                <Alert
                  variant="primary"
                  className="alert-dismissible solid fade show"
                >
                  <strong> Delete Your Entire Profile</strong>{" "}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span
                    style={{ color: "white", cursor: "pointer" }}                                      
					onClick={()=> setBasicModal(true)}
                    >
                                                              
                    click here to delete your profile
                  </span>
				  <Modal className="fade" show={basicModal}>
                  <Modal.Header>
                    <Modal.Title>Are You Sure You want to delete </Modal.Title>
                    <Button
                      variant=""
                      className="btn-close"
                      onClick={() => setBasicModal(false)}
                    >
                      
                    </Button>
                  </Modal.Header>
                  <Modal.Body> Click Delete if you still want to delete your profile .. . otherwise click close</Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => setBasicModal(false)}
                      variant="danger light"
                    >
                      Close
                    </Button>
                    <Button variant="primary"
						onClick={handleDelete}
					>
						Delete 
					</Button>
                  </Modal.Footer>
                </Modal>
                  
                </Alert>
              
            </Card.Body>
          </Card>
                          	</Row>
						</div>
						<div id="my-posts" className={`tab-pane fade ${ activeToggle === "posts" ? "active show" : "" }`} >
							<div className="my-post-content pt-3">
								<div className="post-input">
										<textarea name="textarea" id="textarea" cols={30} rows={5} className="form-control bg-transparent" placeholder="Please type what you want...."defaultValue={""}/>
										<Link to="/app-profile" className="btn btn-primary light px-3 me-1" data-toggle="modal" data-target="#linkModal" onClick={() => setLinkModal(true)}>
											<i className="fa fa-link m-0" />{" "}
										</Link>
									{/* Modal */}
									<Modal show={linkModal} onHide={() => setLinkModal(false)} className="modal fade post-input" id="linkModal" aria-hidden="true">
										<div className="modal-content">
											<div className="modal-header">
												<h5 className="modal-title">Social Links</h5>
												<button type="button" className="btn-close" data-dismiss="modal" onClick={() => setLinkModal(false)}>
												</button>
											</div>
											<div className="modal-body">
												<Link className="btn-social me-1 facebook" to="/app-profile"><i className="fa fa-facebook" /></Link>
												<Link className="btn-social me-1 google-plus" to="/app-profile"> <i className="fa fa-google-plus" /></Link>
												<Link className="btn-social me-1 linkedin" to="/app-profile"><i className="fa fa-linkedin" /></Link>
												<Link className="btn-social me-1 instagram" to="/app-profile"> <i className="fa fa-instagram" /></Link>
												<Link className="btn-social me-1 twitter" to="/app-profile"><i className="fa fa-twitter" /></Link>
												<Link className="btn-social me-1 youtube" to="/app-profile"><i className="fa fa-youtube" /></Link>
												<Link className="btn-social whatsapp" to="/app-profile"><i className="fa fa-whatsapp" /></Link>
											</div>
										</div>
									</Modal>
									<Link to="/app-profile" className="btn btn-primary light px-3 me-1" data-toggle="modal" data-target="#cameraModal" onClick={() => setCameraModal(true)}>
										<i className="fa fa-camera m-0" />{" "}
									</Link>
									{/* Modal */}
									<Modal show={cameraModal} onHide={() => setCameraModal(false)} className="modal fade" id="cameraModal">
										<div className="modal-content">
											<div className="modal-header">
												<h5 className="modal-title">Upload images</h5>
												<button type="button" className="btn-close" data-dismiss="modal" onClick={() => setCameraModal(false)}>
												</button>
											</div>
											<div className="modal-body">
												<div className="input-group mb-3">
													<span className="input-group-text">Upload</span>
													<div className="form-file">
														<input type="file" className="form-file-input form-control"/>
													</div>
												</div>
											</div>
										</div>
									</Modal>
									<Link to="/app-profile" className="btn btn-primary ms-1" data-toggle="modal" data-target="#postModal" onClick={() => setPostModal(true)}>Post</Link>
									{/* Modal */}
									<Modal show={postModal}onHide={() => setPostModal(false)} className="modal fade" id="postModal">
										<div className="modal-content">
											<div className="modal-header">
												<h5 className="modal-title">Post</h5>
												<button type="button" className="btn-close" data-dismiss="modal" onClick={() => setPostModal(false)} >
												</button>
											</div>
											<div className="modal-body">
												<textarea name="textarea" id="textarea" cols={30} rows={5} className="form-control mb-2 bg-transparent" placeholder="Please type what you want...." defaultValue={""}/>
												<Link className="btn btn-primary btn-rounded mt-1" to="/app-profile">Post</Link>
											</div>
										</div>
									</Modal>
								</div>

								<div className="profile-uoloaded-post border-bottom-1 pb-5">
									<img src={profile08} alt="" className="img-fluid w-100 rounded" />
									<Link className="post-title" to="/post-details">
										<h3 className="text-black">Collection of textile samples lay spread</h3>
									</Link>
									<p>
										A wonderful serenity has take possession of my entire soul like these sweet morning of spare which enjoy whole heart.A wonderful serenity has take 
										possession of my entire soul like these sweet morning of spare which enjoy whole heart.
									</p>
									<button className="btn btn-primary me-2">
										<span className="me-2"> <i className="fa fa-heart" /> </span>Like 
									</button>
									<button className="btn btn-secondary" onClick={() => setReplayModal(true)}>
										<span className="me-2"> <i className="fa fa-reply" /></span>Reply
									</button>
								</div>
								<div className="profile-uoloaded-post border-bottom-1 pb-5">
									<img src={profile09} alt="" className="img-fluid w-100 rounded" />
									<Link className="post-title" to="/post-details">
										<h3 className="text-black">Collection of textile samples lay spread</h3>
									</Link>
									<p>
										A wonderful serenity has take possession of my
										entire soul like these sweet morning of spare which
										enjoy whole heart.A wonderful serenity has take
										possession of my entire soul like these sweet
										morning of spare which enjoy whole heart.
									</p>
									<button className="btn btn-primary me-2">
										<span className="me-2"> <i className="fa fa-heart" /> </span>Like
									</button>
									<button className="btn btn-secondary" onClick={() => setReplayModal(true)}>
										<span className="me-2">  <i className="fa fa-reply" /></span>Reply
									</button>
								</div>
								<div className="profile-uoloaded-post pb-3">
									<img src={profile08} alt="" className="img-fluid  w-100 rounded" />
									<Link className="post-title" to="/post-details">
										<h3 className="text-black">Collection of textile samples lay spread</h3>
									</Link>
									<p>
										A wonderful serenity has take possession of my
										entire soul like these sweet morning of spare which
										enjoy whole heart.A wonderful serenity has take
										possession of my entire soul like these sweet
										morning of spare which enjoy whole heart.
									</p>
									<button className="btn btn-primary me-2">
										<span className="me-2"><i className="fa fa-heart" /></span>Like
									</button>
									<button className="btn btn-secondary" onClick={() => setReplayModal(true)}>
										<span className="me-2"> <i className="fa fa-reply" /></span>Reply
									</button>
								</div>
								{/* Modal */}
								<Modal   show={replayModal}onHide={() => setReplayModal(false)} className="modal fade" id="replyModal">										
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title">Post Reply</h5>
											<button type="button" className="btn-close" data-dismiss="modal" onClick={() => setReplayModal(false)}></button>
										</div>
										<div className="modal-body">
											<form>
												<textarea className="form-control" rows="4">Message</textarea>
											</form>
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-danger light" data-dismiss="modal" onClick={() => setReplayModal(false)}>Close</button>
											<button type="button" className="btn btn-primary">Reply</button>
										</div>
									</div>
								</Modal>
							</div>
						</div>
					</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
  }
  else{
	return(
		<Fragment>
			<PageTitle activeMenu="Profile" motherMenu="App" />
			
			<Row>
			<Col xl={6} className="col-xxl-12">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Profile Status</Card.Title>
              
            </Card.Header>
            <Card.Body>
              
                <Alert
                  variant='primary'
                  className="solid alert-square"
                >
                  <strong> profile not found !!!</strong> Please Fill up Your Profile.
                </Alert>
            
            </Card.Body>
          </Card>
        </Col>
		<Col xl={6} className="col-xxl-12">
			<Card>
				<Card.Body>
					<Link to="/form-add-basic-profile"> Click Here to Fill up Profile </Link>
				</Card.Body>
			
			</Card>
			
		</Col>
			</Row>
		</Fragment>
	)
  }
};



export default AppProfile;
