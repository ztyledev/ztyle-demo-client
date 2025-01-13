import React, { Fragment, useState ,useEffect,useContext } from "react";
import {useSelector,useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom';

// components
import { ThemeContext } from "../../../context/ThemeContext";
import PageTitle from "../../../components/PageTitle";
import swal from "sweetalert";
import SingleBeauticianSelectList from '../../../components/SingleBeauticianSelectList';
import LoadingScreen from "../../../components/LoadingScreen";


// actions

import {
  getShopById
} from '../../../store/shop/shopActions'
import {
    getBeauticiansByShopId
} from '../../../store/beautician/beauticianActions'


const BeauticiansByShopId= () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  
  // auth redux states
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getShopById({ id, token }));
  }, [dispatch, id, token]);
  
  // shop redux state

  const { currentShop } = useSelector(state => state.shop);


  useEffect(() => {
    const searchData = { shopId: currentShop.shopId };
    dispatch(getBeauticiansByShopId({ searchData, token }));
  }, [dispatch, id, token]);
  

  // beautician redux state 
  const { beauticians, loading, error } = useSelector(state => state.beautician);
  
  
  
  const { 
		changeSideBarStyle
	} = useContext(ThemeContext);
	useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
	},[]);

  const [reviewModal, setReviewModal] = useState(false);

  

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
  
    else if (beauticians) {
      
    return (
      <Fragment>
        <PageTitle activeMenu="Select" motherMenu="Beauticians" />

          <div className="row">
             {beauticians ? beauticians.map((beautician) => <SingleBeauticianSelectList key={beautician._id} beautician={beautician} />) :
              <div className="text-danger text-center ">
                No beauticians found. please wait a while or inform the shop
              </div>
            }

        
            </div>
       
      </Fragment>
    );
  }
 
};



export default  BeauticiansByShopId ;