import React, { Fragment, useState ,useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Modal,Row, Card, Col, Alert,Badge, Media} from "react-bootstrap";
import {useSelector,useDispatch} from 'react-redux'

// components
import { ThemeContext } from "../../context/ThemeContext";
import PageTitle from "../../components/PageTitle";
import swal from "sweetalert";
import SingleAdminList from "../../components/SingleAdminList";
import LoadingScreen from "../../components/LoadingScreen";


// actions

import {
    getPendingAdmins
} from '../../store/admin/adminActions'


const PendingAdmins = () => {

  const dispatch = useDispatch();
  
  // redux states
  const { token } = useSelector(state => state.auth);
  const { pendingAdmins, loadingAdmin, error } = useSelector(state => state.admin);

    
	  
  
  const { 
		changeSideBarStyle
	} = useContext(ThemeContext);
	useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
	},[]);

  const [reviewModal, setReviewModal] = useState(false);


    useEffect(() => {
        dispatch(getPendingAdmins({ token })); 
    },[dispatch])
  

  useEffect(() => {
    if (error) {
      swal(error, "error");

    }
  }, [error]);



   if (loadingAdmin) {
    return(
      <div>
        <LoadingScreen />
      </div>
      
		)
  }
  
   else if (pendingAdmins) {
  
    return (
      <Fragment>
        <PageTitle activeMenu="Pending" motherMenu="Admins" />

          <div className="row">
            {pendingAdmins ? pendingAdmins.map((admin) => <SingleAdminList key={admin._id} admin={admin} />) :
              <div className="text-danger text-center ">
                No Admins pending. Check Later To find Any. 
              </div>
            }

        
            </div>
      </Fragment>
    );
  }
//   else {
//     return(
//         <Fragment>
//             <PageTitle activeMenu="State" motherMenu="Pending Shops" />
//             <Row>
          
//             </Row>
//         </Fragment>
//      )
//   }

};


export default  PendingAdmins ;
