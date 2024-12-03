import React, { Fragment,useState ,useEffect,useContext } from "react";
import { Button, Modal, Tab, Row, Card, Col, Alert } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

// images/docs
import storePic from '../../../images/store.png';
import defaultCertificate from '../../../pdfs/The Shop Registration Certificate.pdf';


//components
import PageTitle from "../../../components/PageTitle";
import { ThemeContext } from "../../../context/ThemeContext";
import RadialDonut from '../../../components/RadialDonut';
import LoadingScreen from "../../../components/LoadingScreen";
import Spinner from '../../../components/Spinner/Spinner';
import swal from "sweetalert";

//actions
import {
    getShopById
} from '../../../store/shop/shopActions'


// data
// import { monthdata } from "../../data/monthdata";

// utils
import { getStandardTime } from '../../../utils/getStandardTime';
import { extractActiveDays } from '../../../utils/extractActiveDays';


const ProfileDetail = () => {

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
		dispatch(getShopById({ id, token }));
	}, [dispatch, id, token]);
	
    

	const { currentShop ,loading,error} = useSelector(state => state.shop);
	

	const [activeToggle, setActiveToggle] = useState("basicProfile");


	
	
	
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
	
	else if (currentShop) { 
		
        const { shopName, shopId, ownerFullName,
            mobile, state, district, workingDays,
			openingTime, closingTime, profileCompletion,
            advanceProfileStatus, shopImage, image1, image2 } = currentShop;      
        
		// format to display
		const stdOpeningTime = getStandardTime(openingTime);
		const stdClosingTime = getStandardTime(closingTime);
		const activeWorkingDays = extractActiveDays(workingDays);
		


		// advance shop details
        const { address, category, menu } = currentShop;
        		
	 
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
                                                        <h2 className="text-secondary text-center">{shopName}</h2>                                                                               
													</div>
												</div>												
											</div>											
										</div>
										{/* Tab panes */}										
										<div className="col-lg-10">
                                            <div className="card text-center">
                                                <div className="card-body">
                                                    <img src={shopImage || storePic} alt="" className="img-fluid w-80 rounded" />
                                                
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
																<Link to="#advanced-info" data-toggle="tab" className={`nav-link ${activeToggle === "advancedInfo" ? "active show" : ""}`}>Advanced Info</Link>
															</li>																								
															<li className="nav-item" onClick={() => setActiveToggle("photos")}>
																<Link to="#my-posts" data-toggle="tab" className={`nav-link ${activeToggle === "photos" ? "active show" : ""}`}>Photos </Link>
															</li>															
															<li className="nav-item" onClick={() => setActiveToggle("beauticians")}>
																<Link to="#beauticians" data-toggle="tab" className={`nav-link ${activeToggle === "beauticians" ? "active show" : ""}`}>Beauticians </Link>
															</li>
						
						
														</ul>
														<div className="tab-content">
															<div id="basicProfile" className={`tab-pane fade ${activeToggle === "basicProfile" ? "active show" : ""}`}>
																<div className="profile-about-me">
																	<div className="pt-4 border-bottom-1 pb-3">
																		<h4 className="text-secondary mb-4">
																			Basic Information
																		</h4>
																		<div className="row mb-2">
																			<div className="col-4">
																				<h5 className="f-w-500">Name Of The Shop<span className="pull-right">:</span></h5>
																			</div>
																			<div className="col-8">
																				<span>{shopName}</span>
																			</div>
																		</div>
																		<div className="row mb-2">
																			<div className="col-4">
																				<h5 className="f-w-500">Owner's FullName<span className="pull-right">:</span></h5>
																			</div>
																			<div className="col-8">
																				<span>{ownerFullName}</span>
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
																				<h5 className="f-w-500"> State <span className="pull-right">:</span></h5>
																			</div>
																			<div className="col-8">
																				<span>{state}</span>
																			</div>
																		</div>
																		<div className="row mb-2">
																			<div className="col-4">
																				<h5 className="f-w-500">  District <span className="pull-right">:</span></h5>
																			</div>
																			<div className="col-8">
																				<span>{district}</span>
																			</div>
																		</div>
																	</div>
						
						
																<div className="pt-4 border-bottom-1 pb-3">
																	<h4 className="text-secondary mb-4">
																		Shop Info
																	</h4>
																	<div className="row mb-2">
																		<div className="col-4">
																			<h5 className="f-w-500"> Shop Id<span className="pull-right">:</span></h5>
																		</div>
																		<div className="col-8">
																			<span>{shopId} </span>
																		</div>

																	</div>
																	<div className="row mb-2">
																		<div className="col-4">
																			<h5 className="f-w-500"> Languages Known <span className="pull-right">:</span></h5>
																		</div>
																		<div className="col-4">
																			{activeWorkingDays&& activeWorkingDays.map((day) => <span key={day}> {day} , </span>)}
									
																		</div>	                                                                           
																	</div>
																	
																		<div className="row mb-2">
																			<div className="col-4">
																				<h5 className="f-w-500"> Opening Time <span className="pull-right">:</span></h5>
																			</div>
																			<div className="col-8">
																				<span>{stdOpeningTime} </span>
																			</div>
																		</div>
																		<div className="row mb-2">
																			<div className="col-4">
																				<h5 className="f-w-500">  Closing Time <span className="pull-right">:</span></h5>
																			</div>
																			<div className="col-8">
																				<span>{stdClosingTime}</span>											
																			</div>
																		</div>
																		
																		
																		
																	</div>
																	
																</div>
					
															</div>
					
					
															<div id="advanced-info" className={`tab-pane fade ${activeToggle === "advancedInfo" ? "active show" : ""}`}>
															{
																// for advance profile status
																	advanceProfileStatus?
																		<div>																																																			
																			<div className="profile-about-me">
																				<div className="pt-4 border-bottom-1 pb-3">
																					<h4 className="text-secondary mb-4">
																						More Info About The Shop
																					</h4>
																					<div className="row mb-2">
																						<div className="col-4">
																							<h5 className="f-w-500">Category Of The Shop<span className="pull-right">:</span></h5>
																						</div>
																						<div className="col-8">
																							<span>{category}</span>
																						</div>
																					</div>
																					{/* <div className="row mb-2">
																						<div className="col-4">
																							<h5 className="f-w-500">Shop's Geo Location <span className="pull-right">:</span></h5>
																						</div>
																						<div className="col-8">
																							<span>{location}</span>
																						</div>
																					</div> */}
																					<div className="row mb-2">
																						<div className="col-4">
																							<h5 className="f-w-500">  Shop's Address <span className="pull-right">:</span></h5>
																						</div>
																						<div className="col-8">
																							<span>{address}</span>
																						</div>
																					</div>
																					{/* <div className="row mb-2">
																						<div className="col-4">
																							<h5 className="f-w-500">Back Account Id(Payment Gateway)<span className="pull-right">:</span></h5>
																						</div>
																						<div className="col-8">
																							<span>{'accountId'}</span>
																						</div>
																					</div> */}
																					<h4 className="text-secondary mb-4">
																						Shop's Menu
																					</h4>
																																																							
																							{menu && menu.map((item) => (
																								<div key={item.name} style={{background:"whitesmoke",padding:"1rem",margin:"1rem"}}>
																									<div className="row mb-2">
																										<h5 className="text-info">Menu Item</h5>
																									</div>
																									<div className="row mb-2">
																										<div className="col-4">
																											<h5 className="f-w-500">Name Of The Service<span className="pull-right">:</span></h5>
																										</div>
																										<div className="col-8">
																											<span>{item.name}</span>																										
																										</div>																										
																									</div>
																									<div className="row mb-2">
																										<div className="col-4">
																											<h5 className="f-w-500">Price Of The Service<span className="pull-right">:</span></h5>																											
																										</div>																										
																										<div className="col-8">
																											<span>&#8377; {item.price}</span>																										
																										</div>
																									</div>																									
																								</div>
																							))}																							
																																																			
																					
																				</div>
																			</div>																																																																																						
																		</div>
																		: <div> 
																			<Row>			
																				<Col xl={6} className="col-xxl-12">																					
																					<Card>																							
																						<Card.Header className="d-block">																								
																							<Card.Title>Shop Profile Status</Card.Title>																							
																					</Card.Header>																						
																						<Card.Body>																							
																							<Alert																					
																								variant='info'																						
																								className="solid alert-square"
																							>
																								
																								<strong>Advance Info Of The Shop Is Empty !!!</strong> Please Wait a While Fill Up The Same.
																							</Alert>																																																																				</Card.Body>							
																					</Card>																					
																				</Col>																																								
																			</Row>																			
																		</div>
																}

															</div>
															
															<div id="my-posts" className={`tab-pane fade ${activeToggle === "photos" ? "active show" : ""}`} >
																<div className="my-post-content pt-3">
																	<div className="profile-uoloaded-post border-bottom-1 pb-5">
                                                                        <img src={shopImage || storePic} alt="" className="img-fluid w-80 rounded" />	                                                    
																		<Link className="post-title" to="/post-details">
																			<h3 className="text-black">This is the main shop image</h3>
																		</Link>
																		<p>
																			Here you can update shop image which appears in your profile. Select an image file from your device and click 'Upload.' Your new profile picture will be displayed once the upload is complete.																			
																		</p>																																																  																																																															
																	</div>
																	<div className="profile-uoloaded-post border-bottom-1 pb-5">
																		<img src={image1 || storePic} alt="" className="img-fluid w-80 rounded" />																		
																		<Link className="post-title" to="/post-details">																			
																			<h3 className="text-black">Add second picture of shop</h3>																			
																		</Link>																		
																		<p>
																			Here you can add one picture of the shop which appears in your profile. Select an image file from your device and click 'Upload.' Your new  picture will be displayed once the upload is complete.																			
																		</p>																																													  												  																																																																												  
																	</div>
																	<div className="profile-uoloaded-post border-bottom-1 pb-5">
																		<img src={image2 || storePic} alt="" className="img-fluid w-80 rounded" />																		
																		<Link className="post-title" to="/post-details">																			
																			<h3 className="text-black">Add one final pic</h3>																			
																		</Link>																		
																		<p>
																			Here you can add one picture of the shop which appears in your profile. Select an image file from your device and click 'Upload.' Your new  picture will be displayed once the upload is complete.																			
																		</p>																																														  												  																																															  																																															  
																	</div>
																	
																	{/* end of the section */}															 
																</div>																																																																										
															</div>														
															<div id="beauticians" className={`tab-pane fade ${activeToggle === "beauticians" ? "active show" : ""}`} >
																<div className="my-post-content pt-3">
																	<div className="profile-uoloaded-post border-bottom-1 pb-5">
																		<Card>
																			<Card.Body>
																				<Alert									
																					variant="secondary"																					
																					className="alert-dismissible solid fade show"																					
																				>																					
																					<strong> Beauticians Associated With The Shop</strong>{" "} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																					<Link to={`/beauticians-by-shop-id/${shopId}`} className="text-white">see the list</Link>																					
																				</Alert>																		
																			</Card.Body>
																			
																		</Card>
																		

							
																		<Link className="post-title" to="/post-details">
																			<h3 className="text-black">View The Beauticians</h3>
																		</Link>
																		<p>
																			Click the above mentioned link to view beauticians registered under the specified shop.																			
																		</p>
																																																  																																																			
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
				<PageTitle activeMenu="Shop" motherMenu="App" />
				<Row>
					<Col xl={6} className="col-xxl-12">
						<Card>
							<Card.Header className="d-block">
								<Card.Title>Shop Status</Card.Title>
							</Card.Header>
							<Card.Body>
								<Alert
									variant='danger'
									className="solid alert-square"
								>
									<strong> Shop not found !!!</strong> Now this shop does not exist
								</Alert>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Fragment>
		)
	}
};


export default ProfileDetail ;
