import React, { Fragment, useEffect, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux'


// components
import { ThemeContext } from "../../context/ThemeContext";
import PageTitle from "../../components/PageTitle";
import swal from "sweetalert";
import SingleOfferList from "../../components/SingleOfferList";
import LoadingScreen from "../../components/LoadingScreen";

// actions
import {
  getOffers
} from '../../store/offer/offerActions'

const Offers = () => {
  const dispatch = useDispatch();

  // redux states
  const { token } = useSelector(state => state.auth);

  const { 
    changeSideBarStyle
  } = useContext(ThemeContext);
  useEffect(() => {
    changeSideBarStyle({ value: "modern", label: "Modern" });
  }, []);
  
  useEffect(() => {
    dispatch(getOffers({ token }))
    
  }, [dispatch, token]);

  const { loading, offers, error } = useSelector(state => state.offer)
  

  // display error
  useEffect(() => {
    if (error) {
      swal(error, "error");

    }
  }, [error]);


  if (loading) { 
        return (
            <div>
                <LoadingScreen />
            </div>
        )
  }

  else if (offers) {
  
    return (
      <Fragment>
        <PageTitle activeMenu="Select" motherMenu="Offers" />
        <div className="card">
            <div className="card-body">
                <h2 className="text-secondary text-center">All Offers</h2>
            </div>
        </div>
          

        <div className="row">
            {
                offers ? offers.length !== 0 ? offers.map((item,idx) => <SingleOfferList key={idx} item={item} />) :
                    <div className="text-danger text-center ">
                    No offers found. please add an offer for your customers.
                </div>
                :""
            }             
        </div>               
      </Fragment>
    )
  }
}

export default Offers