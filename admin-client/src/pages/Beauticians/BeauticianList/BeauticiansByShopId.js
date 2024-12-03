import React, { Fragment, useState ,useEffect,useContext } from "react";
import {useSelector,useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom';

// components
import { ThemeContext } from "../../../context/ThemeContext";
import PageTitle from "../../../components/PageTitle";
import swal from "sweetalert";
import SingleBeauticianList from '../../../components/SingleBeauticianList';
import LoadingScreen from "../../../components/LoadingScreen";


// actions
import {
  getBeauticiansByShopId
} from '../../../store/beautician/beauticianActions'


const BeauticiansByShopId= () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  
  // auth redux states
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    const searchData = { shopId: id };
    dispatch(getBeauticiansByShopId({ searchData, token }))
  }, [dispatch, id, token]);
  
  
  const { beauticians, loadingBeautician, error } = useSelector(state => state.beautician);
  
  console.log(beauticians, loadingBeautician);

  
  
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



  

   if (loadingBeautician) {
    return(
      <div>
        <LoadingScreen />
      </div>
      
		)
  }
  
   else {
  
    return (
      <Fragment>
        <PageTitle activeMenu="By Shop" motherMenu="Beauticians" />

          <div className="row">
             {beauticians ? beauticians.map((beautician) => <SingleBeauticianList key={beautician._id} beautician={beautician} />) :
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