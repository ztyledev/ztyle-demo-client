import React, { Fragment, useState ,useEffect,useContext } from "react";
import { useSelector} from 'react-redux'


// components
import { ThemeContext } from "../../../context/ThemeContext";
import PageTitle from "../../../components/PageTitle";
import swal from "sweetalert";
import SingleSlot from "../../../components/SingleSlot";
import LoadingScreen from "../../../components/LoadingScreen";

// data
import { monthdata } from '../../../data/monthdata';



const SelectSlot = () => {

   
   
    // redux states
   
    const { currentShop, error } = useSelector(state => state.shop);
    const { currentBeautician } = useSelector(state => state.beautician);
    const { loading,slotDetails } = useSelector(state => state.booking);

  
    const { 
        changeSideBarStyle
    } = useContext(ThemeContext);
    useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
	},[]);

    const [reviewModal, setReviewModal] = useState(false);

    

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
    else if (currentShop && currentBeautician && slotDetails) {
        const dobook = slotDetails.date;
        const dateOfBook=new Date(dobook);
		const dobookDay = dateOfBook.getDate();
		const dobookMonth = dateOfBook.getMonth();
		const dobookYear = dateOfBook.getFullYear();

        return (
            <Fragment>
                <PageTitle activeMenu="Select Slot" motherMenu="Book" />
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-secondary text-center">{currentShop.shopName}</h2>
                        <h3 className="text-center">Beautician : {currentBeautician.fullName}</h3>
                        <p className="text-info text-center">{dobookDay} - {monthdata[dobookMonth]} - {dobookYear}</p>

                    </div>
                </div>
                

                <div className="row">
                    {
                        slotDetails.slots ? slotDetails.slots.length !== 0 ? slotDetails.slots.map((item) => <SingleSlot key={item._id} item={item} />) :
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


export default SelectSlot;
