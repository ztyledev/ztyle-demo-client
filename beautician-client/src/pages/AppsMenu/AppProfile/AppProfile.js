import React, { Fragment, useEffect, useState, useContext } from "react";
import { Button, Dropdown, Modal,Row, Card, Col, Alert} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Compress from 'react-image-file-resizer';


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

// components
import { ThemeContext } from "../../../context/ThemeContext";
import PageTitle from "../../../components/PageTitle";
import Spinner from '../../../components/Spinner/Spinner';
import swal from 'sweetalert';
import LoadingScreen from "../../../components/LoadingScreen";
import BeauticianReviews from "../../../components/beauticianReview/BeauticianReviews";

// data 
import { monthdata } from "../../../data/monthdata";

// utils
import { extractActiveFields } from '../../../utils/extractActiveFields';
import { getStandardTime } from '../../../utils/getStandardTime';

// actions
import {
	getBeauticianProfile,
	updateProfilePic,
	deleteProfilePic,
	deleteBeauticianProfile
} from '../../../store/beauticianProfile/beauticianProfileActions'


const AppProfile = () => {
	const dispatch = useDispatch();

  
	const {  
		changeSideBarStyle
	} = useContext(ThemeContext);
	useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
	}, []);

	// beautician info redux states
	const { email, token } = useSelector(state => state.auth.beauticianInfo);

	// access profile
	useEffect(() => {
		dispatch(getBeauticianProfile({ email, token }));

	}, [dispatch, email, token]);

	// profile redux states
	const { beauticianProfile, loading, error } = useSelector(state => state.beauticianProfile);
	
	// alert error
	useEffect(() => {
		if (error) {
			swal(error, "error");
		}
	}, [error]);


	
	const [activeToggle, setActiveToggle] = useState("basicProfile");
	const [sendMessage, setSendMessage] = useState(false);
	
	let errorsObj = { currentProfilePic: '' };
	const [errors, seterrors] = useState({ errorsObj });

	// fields
	const [currentProfilePic, setcurrentProfilePic] = useState('');
	

	// modals
	const [basicModal, setBasicModal] = useState(false);
	const [deleteProfilePicModal, setdeleteProfilePicModal] = useState(false);


	// enable the profile pic add
	useEffect(() => {
		if (beauticianProfile) {
			if (!beauticianProfile.profilePic) {
				setisProfilePicEdit(true);
			}
		}
	}, [beauticianProfile]);

	// delete secions
	const handleDeleteProfilePic = () => {
		
		const id = beauticianProfile._id;
		setdeleteProfilePicModal(false);
		dispatch(deleteProfilePic({ id, token }));


	}
	const handleDelete=()=>{
		setBasicModal(false);
		const id = beauticianProfile._id;
		dispatch(deleteBeauticianProfile({ id, token }));

	}
   
 
  
	const [errorMessage, seterrorMessage] = useState('');
	const [isProfilePicEdit, setisProfilePicEdit] = useState(false);
	const [isProfilePicEdit1, setisProfilePicEdit1] = useState(false);

	// the data string to file
	function dataUrlToFile(dataUrl, fileName) {
    
    var arr = dataUrl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime })
    
    
	}

	// resize the image file
	const onFileResizeProfilePic = (e) => {

    const file = e.target.files[0];
    
    Compress.imageFileResizer(
      file,
      600,
      800,
      "JPEG",
      100,
      0,
      (uri) => {
        
        const newFile = dataUrlToFile(uri,file.name);
        
        setcurrentProfilePic(newFile);

      },
      "base64"
    )

	}

	// update the profile pic
	const handleProfilePic = (e) => {
		e.preventDefault();

	  let error = false;

		const errorObj = { ...errorsObj };
		
	  if (currentProfilePic === '' || currentProfilePic === null || currentProfilePic === undefined) {
		  errorObj.currentProfilePic = 'Please Select a File';
		  error = true
		}
		
		seterrors(errorObj);

		if (error) {
			return

		}

		const profileData = new FormData();
		profileData.append('profilePic', currentProfilePic);
		setcurrentProfilePic('');
		const id = beauticianProfile._id;
		setisProfilePicEdit(false);
		setisProfilePicEdit1(false);
		dispatch(updateProfilePic({ profileData, id, token }));
		
	
	}
  
  

  
	if (loading) {
		return (
			<div>
				<LoadingScreen />
			</div>
		
		)
	}

	else if (beauticianProfile) {
		
		const { fullName, shopId, mobile,
			email, gender, dob, position,
			specialty, yearsOfExperience, employmentStatus, holidaySchedule,
			languagesSpoken, advanceProfileStatus, profilePic,
			availableSlots,
			clientRating
		 } = beauticianProfile;
		
		const dateOfBirth=new Date(dob);
		const dobDay = dateOfBirth.getDate();
		const dobMonth = dateOfBirth.getMonth();
		const dobYear = dateOfBirth.getFullYear();

		// enable the field for display
		const activeHolidaySchedule = extractActiveFields(holidaySchedule);
		const activeLanguagesSpoken = extractActiveFields(languagesSpoken);

		

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
					<h4 className="text-secondary mb-0">{fullName}</h4>
                    <p>Full Name</p>
                  </div>
                  <div className="profile-email px-2 pt-2">
                    <h4 className="text-secondary mb-0">{email}</h4>
                    <p>email</p>
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
                        <i className="fa fa-user-circle text-secondary me-2" />
                        change  profile pic 
                      </Dropdown.Item>
                      {/* <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-users text-primary me-2" />
                        Add to close friends
                      </Dropdown.Item> */}
                      {/* <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-plus text-primary me-2" />
                        Add to group
                      </Dropdown.Item> */}
					  <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-trash text-primary me-2" />
						 <span onClick={()=>setdeleteProfilePicModal(true)}>Delete profile pic</span>					  
					  </Dropdown.Item>						
                      <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-ban text-primary me-2" />
                        Block
                      </Dropdown.Item>
                    </Dropdown.Menu>
					</Dropdown>
					<Modal className="fade" show={deleteProfilePicModal}>
                  <Modal.Header>
                    <Modal.Title>Are You Sure You want to delete Your Profile Pic</Modal.Title>
                    <Button
                      variant=""
                      className="btn-close"
					  onClick={() => setdeleteProfilePicModal(false)}						  
                    >
                      
                    </Button>
                  </Modal.Header>
                  <Modal.Body> Click Delete if you still want to delete your profile pic .. . otherwise click close</Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => setdeleteProfilePicModal(false)}
                      variant="danger light"
                    >
                      Close
                    </Button>
                    <Button variant="primary"
						onClick={handleDeleteProfilePic}
					>
						Delete 
					</Button>
                  </Modal.Footer>
                </Modal>				
				  
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
                          
						  <input type="file" name="profile-pic" id="profile-pic" onChange={onFileResizeProfilePic} />
						  <button type="submit" className="btn btn-secondary mb-1 ms-1" onClick={handleProfilePic}>
							<span className="me-2"> <i className="fa fa-upload" /></span> Upload
						  </button>
						  <button className="btn btn-primary mb-1 ms-1" onClick={()=>setisProfilePicEdit(false)}>
							<span className="me-2"> <i className="fa fa-times" /></span>Cancel
						  </button>
									
                          
                        </div>
                       {errors.currentProfilePic && <div className="text-danger fs-12">{errors.currentProfilePic}</div>}
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
									<h2 className="text-secondary">Overall Rating</h2>
									<p className="text-center mb-3">
										{			
												
											clientRating ?<span className="rating">{clientRating} &#9733;</span>: <h4 className="text-info">No review has been submitted yet</h4>
										}
										
									</p>
								</div>	                                                       
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
								<Link to="#advanced-info"  data-toggle="tab" className={`nav-link ${ activeToggle === "advancedInfo" ? "active show" : ""}`}>Available Slots For Booking </Link>
							</li>
							<li className="nav-item">
								<Link to="#profile-settings" data-toggle="tab" onClick={() => setActiveToggle("setting")} className={`nav-link ${ activeToggle === "setting" ? "active show" : ""}`}>Profile Setting</Link>
							</li>
							<li className="nav-item" onClick={() => setActiveToggle("posts")}>
								<Link to="#my-posts" data-toggle="tab" className={`nav-link ${ activeToggle === "posts" ? "active show" : ""}`}>Photo</Link>
							</li>
							<li className="nav-item" onClick={() => setActiveToggle("reviews")}>
								<Link to="#reviews" data-toggle="tab" className={`nav-link ${activeToggle === "reviews" ? "active show" : ""}`}>Reviews </Link>
							</li>			
						</ul>
					<div className="tab-content">
					<div id="basicProfile" className={`tab-pane fade ${ activeToggle === "basicProfile" ? "active show" : ""}`}>
						<div className="profile-about-me">
							<div className="pt-4 border-bottom-1 pb-3">
								<h4 className="text-secondary mb-4">
									Personal Information
								</h4>
								<div className="row mb-2">
									<div className="col-4">
										<h5 className="f-w-500"> Full Name <span className="pull-right">:</span></h5>
									</div>
									<div className="col-8">
										<span>{fullName}</span>				
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-4">
										<h5 className="f-w-500">Shop Id<span className="pull-right">:</span></h5>
									</div>
									<div className="col-8">
										<span>{shopId}</span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-4">
										<h5 className="f-w-500">Mobile Number  <span className="pull-right">:</span></h5>
									</div>
									<div className="col-8">
										<span>{mobile}</span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-4">
										<h5 className="f-w-500">  email Id <span className="pull-right">:</span></h5>
									</div>
									<div className="col-8">
										<span>{email}</span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-4">
										<h5 className="f-w-500">  Gender <span className="pull-right">:</span></h5>
									</div>
									<div className="col-8">
										<span>{gender}</span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-4">
										<h5 className="f-w-500">  Date of Birth <span className="pull-right">:</span></h5>
									</div>
									<div className="col-8">
										<span>{dobDay} - {monthdata[dobMonth]} - {dobYear}</span>
									</div>
								</div>					
							</div>
							
							
							<div className="pt-4 border-bottom-1 pb-3">
								<h4 className="text-secondary mb-4">
									Basic Info
								</h4>					
								<div className="row mb-2">
									<div className="col-4">
										<h5 className="f-w-500"> Position<span className="pull-right">:</span></h5>
									</div>
									<div className="col-8">
										<span>{position}  </span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-4">
										<h5 className="f-w-500"> Specialty <span className="pull-right">:</span></h5>
									</div>
									<div className="col-8">
										<span>{specialty}</span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-4">
										<h5 className="f-w-500"> Experience <span className="pull-right">:</span></h5>
									</div>
									<div className="col-8">
										<span>{yearsOfExperience} &nbsp;years</span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-4">
										<h5 className="f-w-500"> Employement Status <span className="pull-right">:</span></h5>
									</div>
									<div className="col-8">
										<span>{employmentStatus}</span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-4">
										<h5 className="f-w-500"> Holiday Schedule <span className="pull-right">:</span></h5>
									</div>
									<div className="col-8">
										{activeHolidaySchedule.map((day)=><span  key={day}> {day} , </span>)}
										
									</div>
											
								</div>					
								<div className="row mb-2">
									<div className="col-4">
										<h5 className="f-w-500"> Languages Known <span className="pull-right">:</span></h5>
									</div>
									<div className="col-8">
										{ activeLanguagesSpoken.map((language)=><span  key={language}> {language} , </span>)}
										
									</div>
											
								</div>
													
								
								
							</div>
							
						</div>
						
					</div>
						
						
						<div id="advanced-info" className={`tab-pane fade ${ activeToggle === "advancedInfo" ? "active show" : ""}`}>
							{
							advanceProfileStatus ? 
							<div>
																																	
									<div className="profile-about-me">
										<div className="pt-4 border-bottom-1 pb-3">
											<h4 className="text-secondary mb-4">
												Time Slots For Booking : Working Day
											</h4>
											{
												availableSlots && availableSlots.map((item) => (
													<div key={item.start} style={{background:"whitesmoke",padding:"1rem",margin:"1rem"}}>
														<div className="row mb-2">
															<h5 className="text-info">Time Slot</h5>
														</div>
														<div className="row mb-2">
															<div className="col-4">
																<h5 className="f-w-500"> Starting Time<span className="pull-right">:</span></h5>
															</div>
															<div className="col-8">
																<span>{getStandardTime(item.start)}</span>
															</div>
														</div>
														<div className="row mb-2">
															<div className="col-4">
																<h5 className="f-w-500"> Ending Time<span className="pull-right">:</span></h5>
															</div>
															<div className="col-8">
																<span>{getStandardTime(item.end)}</span>
															</div>
														</div>
													</div>
													
												))					
											}					
																					
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
												variant='info'
												className="solid alert-square"
												>
												<strong> Your Booking Slot Info is Empty !!!</strong> Please Fill up the same.
												</Alert>
											
											</Card.Body>
										</Card>
									</Col>
										<Col xl={6} className="col-xxl-12">
											<Card>
												<Card.Body>
													<Link to="/form-add-advance-info"> Click Here to Fill up Booking Slot Info </Link>
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
								{ advanceProfileStatus ?
								<Card.Body>
									<Alert
									variant="info"
									className="alert-dismissible solid fade show"
									>
									<strong> Edit Your Booking Slot</strong>{" "} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									
										<Link style={{color:"white"}} to="/form-edit-advance-info"> click here to edit your booking slot info </Link> 
									
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
								<div className="profile-uoloaded-post border-bottom-1 pb-5">
									<img src={profilePic || defaultProfile} alt="" className="img-fluid w-80 rounded" />
												  
									<Link className="post-title" to="/post-details">
										<h3 className="text-black">This is your profile pic</h3>
									</Link>
									<p>
									Here you can update your profile picture which appears in your profile. Select an image file from your device and click 'Upload.' Your new profile picture will be displayed once the upload is complete.
													  
									</p>

									{ isProfilePicEdit1 ?
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
                          
							  		<input type="file" name="profile-pic1" id="profile-pic1" onChange={onFileResizeProfilePic} />
															  
								  <button type="submit" className="btn btn-primary mb-1 ms-1" onClick={handleProfilePic}>
									 <span className="me-2"> <i className="fa fa-upload" /></span> Upload
								  </button>
								  <button className="btn btn-secondary mb-1 ms-1" onClick={()=>setisProfilePicEdit1(false)}>
										<span className="me-2"> <i className="fa fa-times" /></span>Cancel
								  </button>
						  
										</div>					  
							  
									{errors.currentProfilePic && <div className="text-danger fs-12">{errors.currentProfilePic}</div>}
            							</div> : ""
				
									}					
												  
									<button className="btn btn-primary me-2" onClick={() => setisProfilePicEdit1(true)}>
										<span className="me-2"> <i className="fa fa-user" /> </span> {profilePic?"Edit":"Add Photo"} 
									</button>
									{profilePic?<button className="btn btn-secondary" onClick={() => setdeleteProfilePicModal(true)}>
													  <span className="me-2"> <i className="fa fa-trash" /></span>Delete
									</button> : ""}
												  
								</div>
								
							</div>
						</div>
						<div id="reviews" className={`tab-pane fade ${activeToggle === "reviews" ? "active show" : ""}`} >
							<div className="my-post-content pt-3">
								<div className="profile-uoloaded-post border-bottom-1 pb-5">				
									<BeauticianReviews />																	
								</div>
							</div>
						</div>				
						{/* end of section				 */}
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
                  variant='danger'
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
