import React, { Fragment, useState ,useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Modal,Row, Card, Col, Alert,Badge, Media} from "react-bootstrap";


import { ThemeContext } from "../../../../context/ThemeContext";
import PageTitle from "../../../../components/PageTitle";

import { profiledata } from '../../../../data/profiledata';

import SingleProfileList from "../../../../components/SingleProfileList";

// images


const ProfilesInterestMutual = () => {
  
//   const userDetails = useSelector(state => state.auth.user);

  const [userProfile, setuserProfile] = useState({});


  
  const [profilesMatching, setprofilesMatching] = useState(profiledata);
 
  
  const { 

		changeSideBarStyle
		
  } = useContext(ThemeContext);
  
	useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
	},[]);

  const [reviewModal, setReviewModal] = useState(false);
  
  if (userProfile) {
  
    return (
      <Fragment>
        <PageTitle activeMenu="Matching Profiles" motherMenu="Profiles" />

        <div className="row">
          {profilesMatching && profilesMatching.map((profile) => <SingleProfileList key={profile._id} profile={profile} />)}

          {/* review */}
        
        </div>
      </Fragment>
    );
  }
  else {
    return(
		<Fragment>
			<PageTitle activeMenu="Profile" motherMenu="App" />
			
			<Row>
			<Col xl={6} className="col-xxl-12">
			<Card>
			<Link to="/form-add-basic-profile">			
            <Card.Header className="d-block">
              <Card.Title>Profile Status</Card.Title>
              
            </Card.Header>
            <Card.Body>
              
                <Alert
                  variant='primary'
                  className="solid alert-square"
                >
                  <strong> You dont have a profile !!!</strong> Please Fill up Your Profile first.
                </Alert>
            
				</Card.Body>
			</Link>				
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



export default  ProfilesInterestMutual ;
