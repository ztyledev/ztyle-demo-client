import React, { Fragment,useState ,useEffect,useContext } from "react";
import { Button, Modal, Tab, Row, Card, Col, Alert } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Compress from 'react-image-file-resizer';

// images/docs
import storePic from '../../images/store.png';
import defaultCertificate from '../../pdfs/The Shop Registration Certificate.pdf';


//components
import PageTitle from "../../components/PageTitle";
import { ThemeContext } from "../../context/ThemeContext";
import RadialDonut from '../../components/RadialDonut';
import LoadingScreen from "../../components/LoadingScreen";
import Spinner from '../../components/Spinner/Spinner';
import swal from "sweetalert";

//actions
import {
	getShopById,
	updateShopImage,
	deleteShopImage,
	updateImage1,
	deleteImage1,
	updateImage2,
	deleteImage2,
	updateShopCertificate,
	deleteShopCertificate,
	deleteCurrentShop,
	editShopStatusById
} from '../../store/shop/shopActions';

// reset actions
import { resetShop } from '../../store/shop/shopSlice';

// data
// import { monthdata } from "../../data/monthdata";

// utils

import { getStandardTime } from '../../utils/getStandardTime';

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
	
    

	const { currentShop ,loadingShop,error} = useSelector(state => state.shop);
	

	const [activeToggle, setActiveToggle] = useState("basicProfile");

	// file/image fields
	const [currentProfilePic, setcurrentProfilePic] = useState('');
	const [currentImage1, setcurrentImage1] = useState('');
	const [currentImage2, setcurrentImage2] = useState('');
	const [currentShopCertificate, setcurrentShopCertificate] = useState('');
	
	
	// for modals 
	const [basicModal, setBasicModal] = useState(false);
	const [deleteShopImageModal, setdeleteShopImageModal] = useState(false);
	const [deleteImage1Modal, setdeleteImage1Modal] = useState(false);
	const [deleteImage2Modal, setdeleteImage2Modal] = useState(false);
	const [deleteShopCertificateModal, setdeleteShopCertificateModal] = useState(false);
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
		const id = currentShop._id;
		dispatch(deleteCurrentShop({id,token}));

	}

	const handleDeleteShopImage = () => {
		
		const id = currentShop._id;
		setdeleteShopImageModal(false);
		dispatch(deleteShopImage({ id, token }));

	}

	const handleDeleteImage1 = () => {
		
		const id = currentShop._id;
		setdeleteImage1Modal(false);
		dispatch(deleteImage1({ id, token }));

	}
	const handleDeleteImage2 = () => {
		
		const id = currentShop._id;
		setdeleteImage2Modal(false);
		dispatch(deleteImage2({ id, token }));

	}

	const handleDeleteShopCertificate = () => {
		
		const id = currentShop._id;
		setdeleteShopCertificateModal(false);
		dispatch(deleteShopCertificate({ id, token }));
		swal('Shop Certificate Deleted', 'success');
		

	}
	
	// error handling states
	let errorsObj = { currentProfilePic: '' };
	const [errors, seterrors] = useState({ errorsObj });

	// boolean state for file edit
	const [isShopImageEdit, setisShopImageEdit] = useState(false);
	const [isImage1Edit, setisImage1Edit] = useState(false);
	const [isImage2Edit, setisImage2Edit] = useState(false);
	const [isShopCertificateEdit, setisShopCertificateEdit] = useState(false);

	
	// convert the resized data to file
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

	// resize shop image
	const onFileResizeShopImage = (e) => {

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
	
	// udpate shop image
	const handleShopImage = (e) => {
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

		const shopData = new FormData();
		shopData.append('shopImage', currentProfilePic);
		setcurrentProfilePic('');
		const id = currentShop._id;
		setisShopImageEdit(false);
		dispatch(updateShopImage({ shopData, id, token }));

	}

	// resize image 1
	const onFileResizeImage1 = (e) => {

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
        
        setcurrentImage1(newFile);

      },
      "base64"
    )

	}

	// update image1
	const handleImage1 = (e) => {
		e.preventDefault();

	  let error = false;

		const errorObj = { ...errorsObj };
		
	  if (currentImage1 === '' || currentImage1 === null || currentImage1 === undefined) {
		  errorObj.currentImage1 = 'Please Select a File';
		  error = true
		}
		
		seterrors(errorObj);

		if (error) {
			return

		}

		const shopData = new FormData();
		shopData.append('image1', currentImage1);
		setcurrentImage1('');
		const id = currentShop._id;
		setisImage1Edit(false);
		dispatch(updateImage1({ shopData, id, token }));

	
	}

// resize image 2
	const onFileResizeImage2 = (e) => {

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
        
        setcurrentImage2(newFile);

      },
      "base64"
    )

	}

	// update image1
	const handleImage2 = (e) => {
		e.preventDefault();

	  let error = false;

		const errorObj = { ...errorsObj };
		
	  if (currentImage2 === '' || currentImage2 === null || currentImage2 === undefined) {
		  errorObj.currentImage2 = 'Please Select a File';
		  error = true
		}
		
		seterrors(errorObj);

		if (error) {
			return

		}

		const shopData = new FormData();
		shopData.append('image2', currentImage2);
		setcurrentImage2('');
		const id = currentShop._id;
		setisImage2Edit(false);
		dispatch(updateImage2({ shopData, id, token }));
		
		
	
	}

	// set file as shop certificate
	const onFileResizeShopCertificate = (e) => {

    const file = e.target.files[0];
		setcurrentShopCertificate(file);

	}

	// update shop certificate
	const handleShopCertificate = (e) => {
		e.preventDefault();

	  let error = false;

		const errorObj = { ...errorsObj };
		
	  if (currentShopCertificate === '' || currentShopCertificate === null || currentShopCertificate === undefined) {
		  errorObj.currentShopCertificate = 'Please Select a File';
		  error = true
		}
		
		seterrors(errorObj);

		if (error) {
			return

		}

		const shopData = new FormData();
		shopData.append('shopCertificate', currentShopCertificate);
		setcurrentShopCertificate('');
		const id = currentShop._id;
		setisShopCertificateEdit(false);
		dispatch(updateShopCertificate({ shopData, id, token }));
		swal("Certificate Updated Successfully", "success");

	}

	/// Shop status access

	const handleActivate = () => {
		
		const shopData = { status: "active" };
		dispatch(editShopStatusById({ shopData, id, token }));
	}
	
	const handleDeactivate = () => {
		
		const shopData = { status: "pending" };
		dispatch(editShopStatusById({ shopData, id, token }));
	}

	const handleReject = () => {
		const shopData = { status: "rejected" };
		dispatch(editShopStatusById({ shopData, id, token }));
	}

	if (loadingShop) {
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
			advanceProfileStatus, status, shopImage, image1, image2,shopCertificate } = currentShop;
        
		const stdOpeningTime = getStandardTime(openingTime);
		const stdClosingTime = getStandardTime(closingTime);

		// advance shop details
		const { address, location, accountId, category, menu } = currentShop;
		
	 
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
                                                                    <h3 className="text-info">Shop Status : Pending</h3>
                                                                    <p>
                                                                        The Shop Activation pending. You Need To Activate The Same . 
                                                                    </p>
                                                                        
																	 <button className="btn btn-success me-2" onClick={handleActivate}>
                                                                    
                                                                        <span className="me-2"> <i className="fa fa-toggle-on" /> </span> {loadingShop ? <Spinner /> : "Activate"}
																	</button>
																	<button className="btn btn-danger me-2" onClick={()=>setrejectActivationModal(true)}>																	                                                        
																		<span className="me-2"> <i className="fa fa-ban" /> </span> {loadingShop ? <Spinner /> : "Reject"}									
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
																				onClick={handleReject}
																			>
																				Reject 
																			</Button>
																		</Modal.Footer>																				
																	</Modal>										                                                               
																</div>
																: status === "active" ? // for active
																	
																<div className="text-center">
                                                                    <h3 className="text-success">Shop Status:Active</h3>
                                                                    <p>
                                                                        You can deactivate the shop  if it is necessary. 
                                                                    </p>
                                                                        
                                                                    <button className="btn btn-primary me-2" onClick={handleDeactivate}>
                                                                    
                                                                        <span className="me-2"> <i className="fa fa-toggle-off" /> </span> {loadingShop ? <Spinner /> : "Deactivate"}
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
																<Link to="#advanced-info" data-toggle="tab" className={`nav-link ${activeToggle === "advancedInfo" ? "active show" : ""}`}>Advanced Info</Link>
															</li>
															<li className="nav-item">
																<Link to="#profile-settings" data-toggle="tab" onClick={() => setActiveToggle("setting")} className={`nav-link ${activeToggle === "setting" ? "active show" : ""}`}>Shop Profile Setting</Link>																
															</li>														
															<li className="nav-item" onClick={() => setActiveToggle("photos")}>
																<Link to="#my-posts" data-toggle="tab" className={`nav-link ${activeToggle === "photos" ? "active show" : ""}`}>Photos </Link>
															</li>
															<li className="nav-item" onClick={() => setActiveToggle("certificate")}>
																<Link to="#certificate" data-toggle="tab" className={`nav-link ${activeToggle === "certificate" ? "active show" : ""}`}>Shop Certificate </Link>
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
																			{workingDays && workingDays.map((day) => <span key={day}> {day} , </span>)}
									
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
																					<div className="row mb-2">
																						<div className="col-4">
																							<h5 className="f-w-500">Shop's Geo Location <span className="pull-right">:</span></h5>
																						</div>
																						<div className="col-8">
																							<span>{location}</span>
																						</div>
																					</div>
																					<div className="row mb-2">
																						<div className="col-4">
																							<h5 className="f-w-500">  Shop's Address <span className="pull-right">:</span></h5>
																						</div>
																						<div className="col-8">
																							<span>{address}</span>
																						</div>
																					</div>
																					<div className="row mb-2">
																						<div className="col-4">
																							<h5 className="f-w-500">Back Account Id(Payment Gateway)<span className="pull-right">:</span></h5>
																						</div>
																						<div className="col-8">
																							<span>{accountId}</span>
																						</div>
																					</div>
																					<div className="row mb-2">
																						<div className="col-4">
																							<h5 className="f-w-500">  Shop's Menu <span className="pull-right">:</span></h5>
																						</div>
																						<div className="col-4">
																							{menu && menu.map((item) => <span key={item}> {item} , </span>)}																							
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
																							<Card.Title>Shop Profile Status</Card.Title>																							
																					</Card.Header>																						
																						<Card.Body>																							
																							<Alert																					
																								variant='info'																						
																								className="solid alert-square"
																							>
																								
																								<strong>Advance Info Of The Shop Is Empty !!!</strong> Please Fill Up The Same.
																							</Alert>																																																																				</Card.Body>							
																					</Card>																					
																				</Col>
																				
																				<Col xl={6} className="col-xxl-12">
																					<Card>
																						<Card.Body>
																							<Link to={`/form-add-advance-info/${id}`}> Click Here to Fill up Advance Info </Link>
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
																			<Card.Title>Manage Current Shop</Card.Title>																	
																			<p className="mb-0 subtitle">
																				here you can manage current  <code>shop </code> as editing or deleting completely.
																			</p>
																		</Card.Header>
																		<Card.Body>
																			<Alert
																				variant="success"
																				className="alert-dismissible solid fade show"
																			>
																				<strong> Edit Basic Profile Of The Shop</strong>{" "} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;																													
																				<Link style={{ color: "white" }} to={`/form-edit-basic-shop/${id}`}>													
																					click here to edit basic profile
																				</Link>																			
																			</Alert>													
																		</Card.Body>

																		{advanceProfileStatus ?																			
																			<Card.Body>																				
																				<Alert																					
																				variant="info"
																				className="alert-dismissible solid fade show"
																				>																					
																					<strong> Edit Advanced Shop Profile</strong>{" "} &nbsp;&nbsp;&nbsp;&nbsp;																					
																			
																					<Link style={{ color: "white" }} to={`/form-edit-advance-info/${id}`}> click here to edit your advanced profile </Link>																
																			
																				</Alert>																																						
																			</Card.Body>																	
																			: ""}															
																		<Card.Body>
																			
																			<Alert																				
																				variant="primary"
																				className="alert-dismissible solid fade show"
																			>
																				<strong> Delete Entire Shop Profile</strong>{" "}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																				<span
																					style={{ color: "white", cursor: "pointer" }}                                      
																					onClick={()=> setBasicModal(true)}
																				>																												
																					click here to delete shop																					
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
																					<Modal.Body> Click Delete if you still want to delete this shop .. . otherwise click close</Modal.Body>
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
																		<img src={shopImage || storePic} alt="" className="img-fluid w-80 rounded" />																														  
																		<Link className="post-title" to="/post-details">
																			<h3 className="text-black">This is the main shop image</h3>
																		</Link>
																		<p>
																			Here you can update shop image which appears in your profile. Select an image file from your device and click 'Upload.' Your new profile picture will be displayed once the upload is complete.																			
																		</p>
																		{
																			isShopImageEdit ?	
																				<div className="form-group mb-3 row">																
																					<label																						
																						className="col-lg-4 col-form-label"																						
																						htmlFor="val-image"																						
																					>																						
																						Select Main Shop Image																						
																						<span className="text-danger">*</span>																						
																					</label>																					
																					<div																						
																						
																					// className="col-lg-1"																					
																					>
																						
																						<input type="file" name="shop-i,age" id="shopImage" onChange={onFileResizeShopImage} />																																					  
																						<button type="submit" className="btn btn-secondary mb-1 ms-1" onClick={handleShopImage}>
																							<span className="me-2"> <i className="fa fa-upload" /></span> Upload
																						</button>
																						<button className="btn btn-primary mb-1 ms-1" onClick={()=>setisShopImageEdit(false)}>
																								<span className="me-2"> <i className="fa fa-times" /></span>Cancel
																						</button>						  
																					</div>																					
																					{errors.currentProfilePic && <div className="text-danger fs-12">{errors.currentProfilePic}</div>}																					
																				</div>																				
																				: ""																			
																		}
																		
												  
																		<button className="btn btn-secondary me-2" onClick={() => setisShopImageEdit(true)}>													
																			<span className="me-2"> <i className="fa fa-user" /> </span> {shopImage?"Edit":"Add Photo"} 
																		</button>
																		{
																			shopImage ?
																				<button className="btn btn-primary" onClick={() => setdeleteShopImageModal(true)}>													
																					<span className="me-2"> <i className="fa fa-trash" /></span>Delete
																				</button>
																				: ""
																		}
																		<Modal className="fade" show={deleteShopImageModal}>
																			<Modal.Header>																		
																				<Modal.Title>Are You Sure You want to delete </Modal.Title>																				
																				<Button																					
																					variant=""																					
																					className="btn-close"																					
																					onClick={() => setdeleteShopImageModal(false)}																					
																				>																														
																				</Button>																				
																			</Modal.Header>																			
																			<Modal.Body> Click Delete if you still want to delete this pic .. . otherwise click close</Modal.Body>
																			<Modal.Footer>
																				<Button
																				onClick={() => setdeleteShopImageModal(false)}
																				variant="danger light"
																				>
																				Close
																				</Button>
																				<Button variant="primary"
																					onClick={handleDeleteShopImage}
																				>
																					Delete 
																				</Button>
																			</Modal.Footer>
																		</Modal>																		
																	</div>
																	<div className="profile-uoloaded-post border-bottom-1 pb-5">
																		<img src={image1 || storePic} alt="" className="img-fluid w-80 rounded" />																		
																		<Link className="post-title" to="/post-details">																			
																			<h3 className="text-black">Add second picture of shop</h3>																			
																		</Link>																		
																		<p>
																			Here you can add one picture of the shop which appears in your profile. Select an image file from your device and click 'Upload.' Your new  picture will be displayed once the upload is complete.																			
																		</p>


																		{
																			isImage1Edit ?
																				<div className="form-group mb-3 row">																																		
																					<label
																						className="col-lg-4 col-form-label"																						
																						htmlFor="val-image"																						
																					>																						
																						Select A Photo Of Shop 																						
																						<span className="text-danger">*</span>																						
																					</label>																					
																					<div 																						
																						// className="col-lg-1"																						
																					>																																			
																						<input type="file" name="image1" id="image1" onChange={onFileResizeImage1} />																														  															
																						<button type="submit" className="btn btn-secondary mb-1 ms-1" onClick={handleImage1}>
																							<span className="me-2"> <i className="fa fa-upload" /></span> Upload
																						</button>
																						<button className="btn btn-primary mb-1 ms-1" onClick={()=>setisImage1Edit(false)}>
																								<span className="me-2"> <i className="fa fa-times" /></span>Cancel
																						</button>													
																					</div>																																			
																					{errors.currentImage1 && <div className="text-danger fs-12">{errors.currentImage1}</div>}																																			  
																				</div>
																				: ""				
																		}
																														  												  
																		<button className="btn btn-secondary me-2" onClick={()=>setisImage1Edit(true)}>
																						
																			<span className="me-2"> <i className="fa fa-user" /> </span> {image1?"Edit":"Add Photo"} 
																		</button>
																		{
																			image1 ?
																				<button className="btn btn-primary" onClick={() => setdeleteImage1Modal(true)}>
																					<span className="me-2"> <i className="fa fa-trash" /></span>Delete																															
																				</button>																				
																				: ""
																		}												  
																		<Modal className="fade" show={deleteImage1Modal}>																			
																			<Modal.Header>																				
																				<Modal.Title>Are You Sure You want to delete This photo</Modal.Title>																				
																				<Button																					
																					variant=""																					
																					className="btn-close"																					
																					onClick={() => setdeleteImage1Modal(false)}																					
																				>
																			
																				</Button>																				
																			</Modal.Header>																			
																			<Modal.Body> Click Delete if you still want to delete your photo .. . otherwise click close</Modal.Body>																			
																			<Modal.Footer>																				
																				<Button																					
																					onClick={() => setdeleteImage1Modal(false)}																					
																					variant="danger light"																					
																				>																					
																					Close																					
																				</Button>																				
																				<Button variant="primary"																					
																					onClick={handleDeleteImage1}																					
																				>																					
																					Delete 																					
																				</Button>																				
																			</Modal.Footer>																			
																		</Modal>																														  
																	</div>
																	<div className="profile-uoloaded-post border-bottom-1 pb-5">
																		<img src={image2 || storePic} alt="" className="img-fluid w-80 rounded" />																		
																		<Link className="post-title" to="/post-details">																			
																			<h3 className="text-black">Add one final pic</h3>																			
																		</Link>																		
																		<p>
																			Here you can add one picture of the shop which appears in your profile. Select an image file from your device and click 'Upload.' Your new  picture will be displayed once the upload is complete.																			
																		</p>


																		{
																			isImage2Edit ?
																				<div className="form-group mb-3 row">																																		
																					<label
																						className="col-lg-4 col-form-label"																						
																						htmlFor="val-image"																						
																					>																						
																						Select A Photo Of Shop 																						
																						<span className="text-danger">*</span>																						
																					</label>																					
																					<div 																						
																						// className="col-lg-1"																						
																					>																																			
																						<input type="file" name="image2" id="image2" onChange={onFileResizeImage2} />																														  															
																						<button type="submit" className="btn btn-secondary mb-1 ms-1" onClick={handleImage2}>
																							<span className="me-2"> <i className="fa fa-upload" /></span> Upload
																						</button>
																						<button className="btn btn-primary mb-1 ms-1" onClick={()=>setisImage2Edit(false)}>
																								<span className="me-2"> <i className="fa fa-times" /></span>Cancel
																						</button>													
																					</div>																																			
																					{errors.currentImage2 && <div className="text-danger fs-12">{errors.currentImage2}</div>}																																			  
																				</div>
																				: ""				
																		}
																														  												  
																		<button className="btn btn-secondary me-2" onClick={()=>setisImage2Edit(true)}>
																						
																			<span className="me-2"> <i className="fa fa-user" /> </span> {image2?"Edit":"Add Photo"} 
																		</button>
																		{
																			image2 ?
																				<button className="btn btn-primary" onClick={() => setdeleteImage2Modal(true)}>
																					<span className="me-2"> <i className="fa fa-trash" /></span>Delete																															
																				</button>																				
																				: ""
																		}												  
																		<Modal className="fade" show={deleteImage2Modal}>																			
																			<Modal.Header>																				
																				<Modal.Title>Are You Sure You want to delete This photo</Modal.Title>																				
																				<Button																					
																					variant=""																					
																					className="btn-close"																					
																					onClick={() => setdeleteImage2Modal(false)}																					
																				>
																			
																				</Button>																				
																			</Modal.Header>																			
																			<Modal.Body> Click Delete if you still want to delete your photo .. . otherwise click close</Modal.Body>																			
																			<Modal.Footer>																				
																				<Button																					
																					onClick={() => setdeleteImage2Modal(false)}																					
																					variant="danger light"																					
																				>																					
																					Close																					
																				</Button>																				
																				<Button variant="primary"																					
																					onClick={handleDeleteImage2}																					
																				>																					
																					Delete 																					
																				</Button>																				
																			</Modal.Footer>																			
																		</Modal>																														  
																	</div>
																	
																	{/* end of the section */}															 
																</div>																																																																										
															</div>
															<div id="certificate" className={`tab-pane fade ${activeToggle === "certificate" ? "active show" : ""}`} >
																<div className="my-post-content pt-3">
																	<div className="profile-uoloaded-post border-bottom-1 pb-5">
																		<Card>
																			<Card.Body>
																				<Alert									
																					variant="success"																					
																					className="alert-dismissible solid fade show"																					
																				>																					
																					<strong> Registration Certificate Of The Shop</strong>{" "} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																					<a href={shopCertificate || defaultCertificate} target="_blank" style={{color:'white'}}> See Your file</a>																																																							
																				</Alert>

																				
																			</Card.Body>
																			
																		</Card>
																		

							
																		<Link className="post-title" to="/post-details">
																			<h3 className="text-black">Shop Registration Certificate</h3>
																		</Link>
																		<p>
																			Here you can provide the registration certificate of shop. Select a pdf file from your device and click 'Upload.' Your certificate will be displayed once the upload is complete.																			
																		</p>
																		{
																			isShopCertificateEdit ?	
																				<div className="form-group mb-3 row">																
																					<label																						
																						className="col-lg-4 col-form-label"																						
																						htmlFor="val-pdf"																						
																					>																						
																						Select Shop Certificate																						
																						<span className="text-danger">*</span>																						
																					</label>																					
																					<div																						
																						
																					// className="col-lg-1"																					
																					>
																						
																						<input type="file" name="val-pdf" id="val-pdf" onChange={onFileResizeShopCertificate} />																																					  
																						<button type="submit" className="btn btn-secondary mb-1 ms-1" onClick={handleShopCertificate}>
																							<span className="me-2"> <i className="fa fa-upload" /></span> Upload
																						</button>
																						<button className="btn btn-primary mb-1 ms-1" onClick={()=>setisShopCertificateEdit(false)}>
																								<span className="me-2"> <i className="fa fa-times" /></span>Cancel
																						</button>						  
																					</div>																					
																					{errors.currentShopCertificate && <div className="text-danger fs-12">{errors.currentShopCertificate}</div>}																					
																				</div>																				
																				: ""																			
																		}
																		
												  
																		<button className="btn btn-secondary me-2" onClick={() => setisShopCertificateEdit(true)}>													
																			<span className="me-2"> <i className="fa fa-user" /> </span> {shopCertificate?"Edit":"Add Certificate"} 
																		</button>
																		{
																			shopCertificate ?
																				<button className="btn btn-primary" onClick={() => setdeleteShopCertificateModal(true)}>													
																					<span className="me-2"> <i className="fa fa-trash" /></span>Delete
																				</button>
																				: ""
																		}
																		<Modal className="fade" show={deleteShopCertificateModal}>
																			<Modal.Header>																		
																				<Modal.Title>Are You Sure You want to delete </Modal.Title>																				
																				<Button																					
																					variant=""																					
																					className="btn-close"																					
																					onClick={() => setdeleteShopImageModal(false)}																					
																				>																														
																				</Button>																				
																			</Modal.Header>																			
																			<Modal.Body> Click Delete if you still want to delete the certificate .. . otherwise click close</Modal.Body>
																			<Modal.Footer>
																				<Button
																				onClick={() => setdeleteShopCertificateModal(false)}
																				variant="danger light"
																				>
																				Close
																				</Button>
																				<Button variant="primary"
																					onClick={handleDeleteShopCertificate}
																				>
																					Delete 
																				</Button>
																			</Modal.Footer>
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
