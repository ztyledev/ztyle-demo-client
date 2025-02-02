import React, { Fragment, useState ,useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { Row, Card, Col, Alert} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

// components
import { ThemeContext } from '../../../context/ThemeContext';
import PageTitle from '../../../components/PageTitle';
import SingleShopList from '../../../components/SingleShopList';
import LoadingScreen from '../../../components/LoadingScreen';

// actions
import { getShops } from '../../../store/shop/shopActions';
import { resetShop } from '../../../store/shop/shopSlice';



const ShopsSearch = () => {
    const dispatch = useDispatch();
    
    // to get the searched word
    const queryParameters = new URLSearchParams(window.location.search);
    const search = queryParameters.get("search");
    
    const { 
		changeSideBarStyle
		
	} = useContext(ThemeContext);
	useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
    }, []);
    
    // auth redux states
    const { token } = useSelector(state => state.auth);
    

    useEffect(() => {
        dispatch(getShops({ token }))
    }, [dispatch, token]);

    // shop redux states
    const { loading, shops } = useSelector(state => state.shop)
    
    // fields
    const [searchedShops, setsearchedShops] = useState([]);

    useEffect(() => {
        if (shops) {
            const searchedResult = shops.filter(shop =>
                shop.shopName.toLowerCase().includes(search.toLowerCase())
            )

            setsearchedShops(searchedResult);
        }

    }, [search, shops]);


    // reset states on exist
    useEffect(() => {
         return () => dispatch(resetShop())
     }, [dispatch]);

    
    if (loading) { 
        return (
            <div>
                <LoadingScreen />
            </div>
      
        )
    }
    else {
        return (
            <Fragment>
                <PageTitle activeMenu="Search Results" motherMenu="Shops" />
                <h1 className="text-center">Go To Dashboard To Search Again</h1>
                <div className="row">
                    {searchedShops.length !== 0 ? searchedShops.map((shop) => <SingleShopList key={shop._id} shop={shop} />) :    
                    <div className="text-danger text-center ">
                            No shops found. please make sure that you typed the name of the shop correctly. 

                            go to dashboard for search again.            
                    </div>
                    }

                    {/* review */}
        
                </div>
            </Fragment>
        )
    }
}

export default  ShopsSearch ;