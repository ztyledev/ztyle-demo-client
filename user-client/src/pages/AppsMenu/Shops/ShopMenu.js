import React, { Fragment, useState ,useEffect,useContext } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';

// components
import { ThemeContext } from "../../../context/ThemeContext";
import PageTitle from "../../../components/PageTitle";
import swal from "sweetalert";
import SingleShopMenu from "../../../components/SingleShopMenu";
import LoadingScreen from "../../../components/LoadingScreen";



// actions
import {
    getShopById,
    getShopMenu
} from '../../../store/shop/shopActions';


const ShopMenu = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
  
    // redux states
    const { token } = useSelector(state => state.auth);
    const { loading, menu,currentShop, error } = useSelector(state => state.shop);
    
  
    const { 
        changeSideBarStyle
    } = useContext(ThemeContext);
    useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
	},[]);

    const [reviewModal, setReviewModal] = useState(false);

    useEffect(() => {
        dispatch(getShopById({ id, token }));
    }, [dispatch, id, token]);


    // api call shop menu
    useEffect(() => {
        const searchData = { id };
        dispatch(getShopMenu({ searchData, token }));
    }, [dispatch, id, token]);
    

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
    else if(currentShop){    
        return (
            <Fragment>
                <PageTitle activeMenu="Select Service" motherMenu="Menu" />
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-secondary text-center">{currentShop.shopName}</h2>
                    </div>
                </div>
                

                <div className="row">
                    {
                        menu ? menu.length !== 0 ? menu.map((item) => <SingleShopMenu key={item._id} item={item} />) :
                            <div className="text-danger text-center ">
                            No menu found. please wait a while for update shops menu.
                        </div>
                        :""
                    }             
                </div>               
            </Fragment>            
    );
    }
    

 
};



export default  ShopMenu ;