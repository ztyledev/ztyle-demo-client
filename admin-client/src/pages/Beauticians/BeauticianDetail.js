import React, { Fragment,useState ,useEffect,useContext } from "react";
import { Button, Modal, Tab, Row, Card, Col, Alert } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';


// images/docs
import storePic from '../../images/store.png';



//components
import PageTitle from "../../components/PageTitle";
import { ThemeContext } from "../../context/ThemeContext";
import RadialDonut from '../../components/RadialDonut';
import LoadingScreen from "../../components/LoadingScreen";
import Spinner from '../../components/Spinner/Spinner';
import swal from "sweetalert";

//actions
import {
	getBeauticianById,
	editBeauticianById,
	deleteBeauticianById
} from '../../store/beautician/beauticianActions'


// data
import { monthdata } from "../../data/monthdata";

// utils
import { getStandardTime } from '../../utils/getStandardTime';
import { extractActiveDays } from '../../utils/extractActiveDays';


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

    // access the shop by id
	useEffect(() => {
		dispatch(getBeauticianById({ id, token }));
	}, [dispatch, id, token]);
	
    

	const { currentBeautician ,loadingBeautician,error} = useSelector(state => state.beautician);
	

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

	


	/// Delete Section
	const handleDelete = () => {

		setBasicModal(false);
		dispatch(deleteBeauticianById({ id, token }));
		
	}

		
	
	/// Beautician status access

	const handleActivate = () => {
		
		const beauticianData = { status: "active" };
		dispatch(editBeauticianById({ beauticianData, id, token }));
	}
	
	const handleDeactivate = () => {
		
		const beauticianData = { status: "pending" };
		dispatch(editBeauticianById({ beauticianData, id, token }));
	}

	const handleReject = () => {
		const beauticianData = { status: "rejected" };
		dispatch(editBeauticianById({ beauticianData, id, token }));
	}

	if (loadingBeautician) {
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
            profilePic, availableSlots, status, profileCompletion } = currentBeautician;
        
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
														{
															status === "pending" ? // for pending shops
																
																<div className="text-center">
                                                                    <h3 className="text-info">Beautician Status : Pending</h3>
                                                                    <p>
                                                                        The Activation is pending. You Need To Activate The Same . 
                                                                    </p>
                                                                        
																	 <button className="btn btn-success me-2" onClick={handleActivate}>
                                                                    
                                                                        <span className="me-2"> <i className="fa fa-toggle-on" /> </span> {loadingBeautician ? <Spinner /> : "Activate"}
																	</button>
																	<button className="btn btn-danger me-2" onClick={()=>setrejectActivationModal(true)}>																	                                                        
																		<span className="me-2"> <i className="fa fa-ban" /> </span> {loadingBeautician ? <Spinner /> : "Reject"}									
																	</button>
																	<Modal className="fade" show={rejectActivationModal}>
																		<Modal.Header>																	
																			<Modal.Title>Are You Sure You want to Reject. </Modal.Title>											
																			<Button
																			variant=""
																			className="btn-close"
																			onClick={() => setrejectActivationModal(false)}
																			>																						
																			</Button>									
																		</Modal.Header>
																		<Modal.Body> Rejected Beautician Cannot Be Reactivated</Modal.Body>
																		<Modal.Footer>
																			<Button
																			onClick={() => setrejectActivationModal(false)}
																			variant="danger light"
																			>
																			Close
																			</Button>
																			<Button variant="primary"
																				onClick={handleReject}
																			>
																				Reject 
																			</Button>
																		</Modal.Footer>																				
																	</Modal>										                                                               
																</div>
																: status === "active" ? // for active
																	
																<div className="text-center">
                                                                    <h3 className="text-success">Beautician Status:Active</h3>
                                                                    <p>
                                                                        You can deactivate the beautician if it is necessary. 
                                                                    </p>
                                                                        
                                                                    <button className="btn btn-primary me-2" onClick={handleDeactivate}>
                                                                    
                                                                        <span className="me-2"> <i className="fa fa-toggle-off" /> </span> {loadingBeautician ? <Spinner /> : "Deactivate"}
                                                                    </button>
																</div>
																	: 
																	<div className="text-center">
																		<h3 className="text-danger">Status : Rejected</h3>
																		<p>
																			The Activation Of This Beautician Is Rejected
																		</p>
																	</div>
														}
                                                            																																										                                                               																																										
													</div>
												</div>												
											</div>											
										</div>
										{/* Tab panes */}										
										<div className="col-lg-10">
                                            <div className="card text-center">
                                                <div className="card-body">
                                                    <div id="radialChart" className="radialChart">                                               
                                                        {<RadialDonut profileCompletion={profileCompletion?profileCompletion:"0"} />}
                                                    </div>                                          
                                                    <h2> {profileCompletion?profileCompletion:"0"} %</h2>                                            
                                                    <span className="fs-16 text-black">Profile Completion</span>
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
															<li className="nav-item">
																<Link to="#profile-settings" data-toggle="tab" onClick={() => setActiveToggle("setting")} className={`nav-link ${activeToggle === "setting" ? "active show" : ""}`}>Shop Profile Setting</Link>																
															</li>														
															<li className="nav-item" onClick={() => setActiveToggle("photos")}>
																<Link to="#my-posts" data-toggle="tab" className={`nav-link ${activeToggle === "photos" ? "active show" : ""}`}>Photos </Link>
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
															<div id="profile-settings" className={`tab-pane fade ${ activeToggle === "setting" ? "active show" : ""}`}>
																<Row>
																	<Card>																		
																		<Card.Header className="d-block">
																			<Card.Title>Manage Current Beautician</Card.Title>																	
																			<p className="mb-0 subtitle">
																				you can only delete the specified  <code>beautician </code> since editing is not accessible.
																			</p>
																		</Card.Header>
																		
																																	
																		<Card.Body>
																			
																			<Alert																				
																				variant="primary"
																				className="alert-dismissible solid fade show"
																			>
																				<strong> Delete The Beautician</strong>{" "}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																				<span
																					style={{ color: "white", cursor: "pointer" }}                                      
																					onClick={()=> setBasicModal(true)}
																				>																												
																					click here to delete beautician																					
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
																					<Modal.Body> Click Delete if you still want to delete this beautician .. . otherwise click close</Modal.Body>
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
															<div id="my-posts" className={`tab-pane fade ${activeToggle === "photos" ? "active show" : ""}`} >
																<div className="my-post-content pt-3">
																	<div className="profile-uoloaded-post border-bottom-1 pb-5">
																		<img src={profilePic || storePic} alt="" className="img-fluid w-80 rounded" />																														  
																		
																																																  																																																					
																	</div>
																																		
																	
																	{/* end of the section */}															 
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
