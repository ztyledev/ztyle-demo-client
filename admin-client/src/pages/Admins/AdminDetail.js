import React, { Fragment,useState ,useEffect,useContext } from "react";
import { Button, Modal, Tab, Row, Card, Col, Alert } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Compress from 'react-image-file-resizer';

// images/docs
import defaultProfilePic from '../../images/avatar/defaultProfilePic.png';


//components
import PageTitle from "../../components/PageTitle";
import { ThemeContext } from "../../context/ThemeContext";
import RadialDonut from '../../components/RadialDonut';
import LoadingScreen from "../../components/LoadingScreen";
import Spinner from '../../components/Spinner/Spinner';
import swal from "sweetalert";

//actions
import {
    getAdminById
} from '../../store/admin/adminActions'



const AdminDetail = () => {

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

    // access the admin by id
	useEffect(() => {
        dispatch(getAdminById({ id, token }));
	}, [dispatch, id, token]);
	
    



	const { currentAdmin ,loadingAdmin,error} = useSelector(state => state.admin);
	

	const [activeToggle, setActiveToggle] = useState("basicProfile");

	
	const [currentShopCertificate, setcurrentShopCertificate] = useState('');
	
	
	// for modals 
    const [basicModal, setBasicModal] = useState(false);
    const [rejectActivationModal, setrejectActivationModal] = useState(false);

	
	
	// display error
	useEffect(() => {
		if (error) {
			swal(error, "error");
		}
	}, [error]);




	if (loadingAdmin) {
		return(
		<div>
			<LoadingScreen/>
			</div>
		)

	}
	
	else if (currentAdmin) {
		
        const { status, fullName, designation, mobile, email } = currentAdmin;

		


	 
		return (
			<>
				<PageTitle motherMenu="Admin" activeMenu=" Details" />
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
                                                                    <h3 className="text-info">Admin Status : Pending</h3>
                                                                    <p>
                                                                        The Admin Account Activation pending. You Need To Activate The Same . 
                                                                    </p>
                                                                        
																	 <button className="btn btn-success me-2" onClick={''}>
                                                                    
                                                                        <span className="me-2"> <i className="fa fa-toggle-on" /> </span> {loadingAdmin ? <Spinner /> : "Activate"}
																	</button>
																	<button className="btn btn-danger me-2" onClick={()=>setrejectActivationModal(true)}>																	                                                        
																		<span className="me-2"> <i className="fa fa-ban" /> </span> {loadingAdmin ? <Spinner /> : "Reject"}									
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
																		<Modal.Body> Rejected Shops Cannot Be Reactivated</Modal.Body>
																		<Modal.Footer>
																			<Button
																			onClick={() => setrejectActivationModal(false)}
																			variant="danger light"
																			>
																			Close
																			</Button>
																			<Button variant="primary"
																				onClick={'handleReject'}
																			>
																				Reject 
																			</Button>
																		</Modal.Footer>																				
																	</Modal>										                                                               
																</div>
																: status === "active" ? // for active
																	
																<div className="text-center">
                                                                    <h3 className="text-success">Admin Status:Active</h3>
                                                                    <p>
                                                                        You can deactivate the admin  if it is necessary. 
                                                                    </p>
                                                                        
                                                                    <button className="btn btn-primary me-2" onClick={'handleDeactivate'}>
                                                                    
                                                                        <span className="me-2"> <i className="fa fa-toggle-off" /> </span> {loadingAdmin ? <Spinner /> : "Deactivate"}
                                                                    </button>
																</div>
																	: 
																	<div className="text-center">
																		<h3 className="text-danger">Status : Rejected</h3>
																		<p>
																			The Activation Of This Shop Is Rejected
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
                                                    <div className="text-center">
                                                        <h3 className="text-danger">Delete Admin Account</h3>
                                                        <p>
                                                            You can Delete the admin  if it is necessary. 
                                                        </p>
                                                            
                                                        <button className="btn btn-primary me-2" onClick={'handleDelete'}>                                           
                                                            <span className="me-2"> <i className="fa fa-trash" /> </span> {loadingAdmin ? <Spinner /> : "Delete"}
                                                        </button>                                           
                                                    </div>
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
															
						
						
														</ul>
														<div className="tab-content">
															<div id="basicProfile" className={`tab-pane fade ${activeToggle === "basicProfile" ? "active show" : ""}`}>
																<div className="profile-about-me">
																	<div className="pt-4 border-bottom-1 pb-3">
																		<h4 className="text-secondary mb-4">
																			Admin Information
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
																				<h5 className="f-w-500">Designation<span className="pull-right">:</span></h5>
																			</div>
																			<div className="col-8">
																				<span>{designation}</span>
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
																				<h5 className="f-w-500"> E-mail <span className="pull-right">:</span></h5>
																			</div>
																			<div className="col-8">
																				<span>{email}</span>
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
				<PageTitle activeMenu="Admin" motherMenu="App" />
				<Row>
					<Col xl={6} className="col-xxl-12">
						<Card>
							<Card.Header className="d-block">
								<Card.Title>Admin Status</Card.Title>
							</Card.Header>
							<Card.Body>
								<Alert
									variant='danger'
									className="solid alert-square"
								>
									<strong> Admin not found !!!</strong> Now this admin does not exist
								</Alert>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Fragment>
		)
	}
};


export default AdminDetail ;
