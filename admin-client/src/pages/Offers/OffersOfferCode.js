import React, { Fragment, useState ,useEffect,useContext } from "react";
import { Row } from "react-bootstrap";
import {useSelector,useDispatch} from 'react-redux'

// components
import { ThemeContext } from "../../context/ThemeContext";
import PageTitle from "../../components/PageTitle";
import Spinner from "../../components/Spinner/Spinner";
import swal from "sweetalert";
import SingleOfferList from "../../components/SingleOfferList";
import LoadingScreen from "../../components/LoadingScreen";


// actions
import {
  getOfferByOfferCode
} from '../../store/offer/offerActions';


const ShopsShopId = () => {

  const dispatch = useDispatch();
  
  // redux states
  const { token } = useSelector(state => state.auth);
  const { offers, loading, error } = useSelector(state => state.offer);


  // error object 
  let errorsObj = { offerCode: '' };
  const [errors, setErrors] = useState(errorsObj);

  // field for search

    const [offerCode, setOfferCode] = useState('');
    
  const handleSubmit = (e) => {
    e.preventDefault();
    // front end validation
    let error = false;
    const errorObj = { ...errorsObj };

    if (offerCode === '') {
      errorObj.offerCode = 'Offer Code Is Required';
      error = true;
      }

    setErrors(errorObj);

    if (error) {
		
			return ;
      }
      
      const searchData = { offerCode };
      dispatch(getOfferByOfferCode({ searchData, token }));
      
  }
  
	
  
  const { 
		changeSideBarStyle
	} = useContext(ThemeContext);
	useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
	},[]);

  

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
  
   else if (offers) {
  
    return (
      <Fragment>
        <PageTitle activeMenu="District" motherMenu="Pending Shops" />

          <div className="row">
          {
            offers ? <SingleOfferList item={offers} /> :
              <div className="text-danger text-center ">
                No Offer found. Please make sure that offer code entered is correct.
              </div>
          }
        
        </div>
      </Fragment>
    );
  }
  else {
       return (
           <Fragment>
        <PageTitle activeMenu="Offer Code" motherMenu="Offers" />
        <Row>
          <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                    <div className="auth-form">
                      <h4 className="text-center mb-4 ">Enter The Offer Code to Search</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3 row">
                                <label
                                className="col-lg-4 col-form-label"
                                htmlFor="val-shopId"
                                >
                                    Offer Code
                                    <span className="text-danger">*</span>
                                                    
                                </label>
                                <div className="col-lg-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="val-shopId"
                                        name="val-shopId"
                                        placeholder="Enter Offer Code.."
                                        value={offerCode}
                                        onChange={(e)=> setOfferCode(e.target.value) }
                                    />
                          
                                </div>
                                 {errors.offerCode && <div className="text-danger fs-12">{errors.offerCode}</div>}
                            </div>
                            <div className="form-group mb-3 row">
                                <div className="col-lg-8 ms-auto">
                                    <button type="submit" className="btn btn-secondary">
                                        {loading ? <Spinner /> : "Submit"}
                                    </button>
                                </div>
                            </div>                   
                                               
                       </form>                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </Row>
      </Fragment>
     )
  }

};



export default  ShopsShopId ;