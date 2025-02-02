import React, { Fragment,useState ,useEffect,useContext } from "react";
import { Button, Modal, Tab, Row, Card, Col, Alert } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';


// images/docs
import defaultProfilePic from '../../../images/avatar/beauticianProfilePic.png';



//components
import PageTitle from "../../../components/PageTitle";
import { ThemeContext } from "../../../context/ThemeContext";
import LoadingScreen from "../../../components/LoadingScreen";
import swal from "sweetalert";
import BeauticianReviews from "../../../components/beauticianReview/BeauticianReviews";

//actions
import {
	getBeauticianById
} from '../../../store/beautician/beauticianActions'


// data
import { monthdata } from "../../../data/monthdata";

// utils
import { getStandardTime } from '../../../utils/getStandardTime';
import { extractActiveDays } from '../../../utils/extractActiveDays';


const BeauticianDetail = () => {

	const dispatch = useDispatch();
	const { id } = useParams();
	
    const { 
		changeSideBarStyle
		
	} = useContext(ThemeContext);
	useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
	},[]);

	
	const { token } = useSelector(state => state.auth);
	
	

	const [reviewToggle, setReviewToggle] = useState(false);
	const [activeTab, setActiveTab] = useState('0');
	const [replayModal, setReplayModal] = useState(false);
	
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    // access the beautician by id
	useEffect(() => {
		dispatch(getBeauticianById({ id, token }));
	}, [dispatch, id, token]);
	
    

	const { currentBeautician ,loading,error} = useSelector(state => state.beautician);
	

	const [activeToggle, setActiveToggle] = useState("basicProfile");

	
	
	
	// for modals 
	const [basicModal, setBasicModal] = useState(false);
	const [rejectActivationModal, setrejectActivationModal] = useState(false);

	
	
	// display error
	useEffect(() => {
		if (error) {
			swal(error, "error");
		}
	}, [error]);

				

	if (loading) {
		return(
		<div>
			<LoadingScreen/>
			</div>
		)

	}
	
	else if (currentBeautician) {
		
        const { fullName, shopId, mobile,
            email, gender, dob, position,
            specialty, yearsOfExperience, employmentStatus,
            holidaySchedule, languagesSpoken, advanceProfileStatus,
			profilePic, availableSlots, profileCompletion } = currentBeautician;
        
        const dateOfBirth=new Date(dob);
		const dobDay = dateOfBirth.getDate();
		const dobMonth = dateOfBirth.getMonth();
        const dobYear = dateOfBirth.getFullYear();
        
        // enable the field for display
		const activeHolidaySchedule = extractActiveDays(holidaySchedule);
		const activeLanguagesSpoken = extractActiveDays(languagesSpoken);
		
		
	 
		return (
			<>
				<PageTitle motherMenu="Profile" activeMenu=" Details" />
				<div className="row">									
					<div className="col-lg-12">						
						<div className="card">							
							<div className="card-body">								
								<div className="row">						
									<div className="col-xl-3 col-lg-6  col-md-6 col-xxl-5 ">																
										<div className="col-lg-10">											
											<div className="card">												
												<div className="card-body">													
													<div className="profile-statistics">																																												
                                                        <div className="text-center">                                                           
															<h2 className="text-secondary">{fullName}</h2>
															<p className="text-center mb-3">
																{
																	currentBeautician.clientRating?<span className="rating">{currentBeautician.clientRating} &#9733;</span>: <Link to={`/reviews/beautician/my-review/${currentBeautician._id}`}><h4 className="text-info">Be the first one to review this beautician</h4></Link>
																}
																
															</p>
															<p className="text-center mb-2">
																{
																	currentBeautician.clientRating?<Link to={`/reviews/beautician/my-review/${currentBeautician._id}`}><h4>Rate and review this beautician</h4></Link>:""
																}
															</p>
                                                        </div>	                                                       
													</div>
												</div>												
											</div>											
										</div>
										{/* Tab panes */}										
										<div className="col-lg-10">
                                            <div className="card text-center">
                                                <div className="card-body">
                                                    <img src={profilePic || defaultProfilePic} alt="" className="img-fluid w-80 rounded" />
                                                </div>
                                            </div>
                                        </div>                                     
                                    </div>
                
									{/*Tab slider End*/}
									<div className="col-xl-6">
										<div className="card">
											<div className="card-body">
												<div className="profile-tab">
													<div className="custom-tab-1">
														<ul className="nav nav-tabs">
						
															<li className="nav-item" onClick={() => setActiveToggle("basicProfile")}>
																<Link to="#basic-profile" data-toggle="tab" className={`nav-link ${activeToggle === "basicProfile" ? "active show" : ""}`}>Basic Profile</Link>
															</li>
															<li className="nav-item" onClick={() => setActiveToggle("advancedInfo")}>
																<Link to="#advanced-info" data-toggle="tab" className={`nav-link ${activeToggle === "advancedInfo" ? "active show" : ""}`}>Available Slots For Booking </Link>
															</li>
															<li className="nav-item" onClick={() => setActiveToggle("reviews")}>
																<Link to="#reviews" data-toggle="tab" className={`nav-link ${activeToggle === "reviews" ? "active show" : ""}`}>Reviews </Link>
															</li>
															
															
																																		
						
														</ul>
														<div className="tab-content">
															<div id="basicProfile" className={`tab-pane fade ${activeToggle === "basicProfile" ? "active show" : ""}`}>
																<div className="profile-about-me">
																	<div className="pt-4 border-bottom-1 pb-3">
																		<h4 className="text-secondary mb-4">
																			Personal Information
																		</h4>
																		<div className="row mb-2">
																			<div className="col-4">
																				<h5 className="f-w-500">Full Name<span className="pull-right">:</span></h5>
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
																				<h5 className="f-w-500">  Mobile Number <span className="pull-right">:</span></h5>
																			</div>
																			<div className="col-8">
																				<span>{mobile}</span>
																			</div>
																		</div>
																		<div className="row mb-2">
																			<div className="col-4">
																				<h5 className="f-w-500"> email Id <span className="pull-right">:</span></h5>
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
																			<span>{position} </span>
																		</div>

																	</div>
																	<div className="row mb-2">
																		<div className="col-4">
																			<h5 className="f-w-500"> Specialty <span className="pull-right">:</span></h5>
																		</div>
																		<div className="col-4">
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
					
					
															<div id="advanced-info" className={`tab-pane fade ${activeToggle === "advancedInfo" ? "active show" : ""}`}>
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
															<div id="reviews" className={`tab-pane fade ${activeToggle === "reviews" ? "active show" : ""}`} >
																<div className="my-post-content pt-3">
																	<div className="profile-uoloaded-post border-bottom-1 pb-5">																																				
																		<BeauticianReviews />																	
																	</div>
																</div>
															</div>
															
															
															
																																												
															{/* end of the section */}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>                
								</div>
							</div>
						</div>
					</div>
					{/* review */}
				</div>
			</>
		);
	}
	else {
		
		return (
			<Fragment>
				<PageTitle activeMenu="Beautician" motherMenu="App" />
				<Row>
					<Col xl={6} className="col-xxl-12">
						<Card>
							<Card.Header className="d-block">
								<Card.Title>Beautician Status</Card.Title>
							</Card.Header>
							<Card.Body>
								<Alert
									variant='danger'
									className="solid alert-square"
								>
									<strong> Beautician not found !!!</strong> Now this beautician does not exist
								</Alert>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Fragment>
		)
	}
};


export default BeauticianDetail ;
