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
    getAdmins
} from '../../store/admin/adminActions'


const AllAdmins = () => {

  const dispatch = useDispatch();
  
  // redux states
  const { token } = useSelector(state => state.auth);
  const { activeAdmins, loadingAdmin, error } = useSelector(state => state.admin);

    
  
  const { 
		changeSideBarStyle
	} = useContext(ThemeContext);
	useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
	},[]);

  const [reviewModal, setReviewModal] = useState(false);

    useEffect(() => {
        dispatch(getAdmins({ token }));
    }, [dispatch, token]);
    
  

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
  
   else if (activeAdmins) {
  
    return (
      <Fragment>
        <PageTitle activeMenu="State" motherMenu="Active Shops" />

          <div className="row">
            {activeAdmins ? activeAdmins.map((admin) => <SingleAdminList key={admin._id} admin={admin} />) :
              <div className="text-danger text-center ">
                No profiles found. please wait a while for new profiles
              </div>
            }

        
            </div>
      </Fragment>
    );
  }
  else {
    return(
      <Fragment>
        <PageTitle activeMenu="State" motherMenu="Active Shops" />
        <Row>
          
          
        </Row>
      </Fragment>
     )
  }

};



export default  AllAdmins ;