import React, { Fragment, useState ,useEffect,useContext } from "react";
import {useSelector,useDispatch} from 'react-redux'

// components
import { ThemeContext } from "../../../context/ThemeContext";
import PageTitle from "../../../components/PageTitle";
import swal from "sweetalert";
import SingleShopList from "../../../components/SingleShopList";
import LoadingScreen from "../../../components/LoadingScreen";



// actions
import {
    getShops
} from '../../../store/shop/shopActions';


const ShopList = () => {

    const dispatch = useDispatch();
  
    // redux states
    const { token } = useSelector(state => state.auth);
    const { loading, shops, error } = useSelector(state => state.shop);
    
  
    const { 
        changeSideBarStyle
    } = useContext(ThemeContext);
    useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
	},[]);

    const [reviewModal, setReviewModal] = useState(false);

    // api call shops
    useEffect(() => {
        dispatch(getShops({ token }));
    }, [dispatch, token]);
    

    // display error
  useEffect(() => {
    if (error) {
      swal(error, "error");

    }
  }, [error]);




   if (loading) { 
    return(
      <div>
        <LoadingScreen />
      </div>
      
		)
  }
   else if (shops) {  
  
    return (
      <Fragment>
        <PageTitle activeMenu="Near Shops" motherMenu=" Shops" />

          <div className="row">
            {shops ? shops.map((shop) => <SingleShopList key={shop._id} shop={shop} />) :
              <div className="text-danger text-center ">
                No Shops found. please wait a while for new shops to activate
              </div>
            }

        
            </div>
      </Fragment>
    );
  }
 
};



export default  ShopList ;