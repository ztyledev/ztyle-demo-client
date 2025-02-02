import React, { Fragment, useState , useEffect,useContext} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

// components
import { ThemeContext } from "../../context/ThemeContext";
import PageTitle from "../../components/PageTitle";
import Spinner from "../../components/Spinner/Spinner";
import swal from 'sweetalert';

// actions
import {
    getOfferById,
    editOfferById
} from '../../store/offer/offerActions';
import { resetOffer } from '../../store/offer/offerSlice';


const FormEditOffer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    

    const { 
        changeSideBarStyle
    } = useContext(ThemeContext);
    useEffect(() => {
        changeSideBarStyle({ value: "modern", label: "Modern" });
    }, []);
    
    // access user state
    const { token } = useSelector(state => state.auth);

    // get current offer
    useEffect(() => {
        dispatch(getOfferById({ id, token }))
    }, [dispatch, id, token]);

    const { loading, currentOffer, success, error } = useSelector(state => state.offer);

    // preset the field values
    useEffect(() => {
        if (currentOffer) {
            // extract the date string 
            const currentStartDate = currentOffer.startDate.substring(0, 10)
            const currentEndDate = currentOffer.endDate.substring(0, 10)

            setofferName(currentOffer.offerName)
            setofferCode(currentOffer.offerCode)
            setofferDescription(currentOffer.offerDescription)
            setdiscountPercentage(currentOffer.discountPercentage)
            setstartDate(currentStartDate)
            setendDate(currentEndDate)

        }
    }, [currentOffer]);

    
    // error object for  fields
    let errorsObj = { offerName: '', offerCode:'',startDate:'',endDate:'',discountPercentage:'', };
    const [errors, seterrors] = useState({ errorsObj });

    // fields
    const [offerName, setofferName] = useState('');
    const [offerCode, setofferCode] = useState('');
    const [offerDescription,setofferDescription]=useState('')
    const [startDate, setstartDate] = useState('');
    const [endDate, setendDate] = useState('');
    const [discountPercentage, setdiscountPercentage] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (offerName === '') {
        errorObj.offerName = 'Offer Name is Required';
        error = true;
        }
        if (offerCode === '') {
        errorObj.offerCode = 'Offer Code is Required';
        error = true;
        }
        if (startDate === '') {
        errorObj.startDate = 'Offer Start Date is Required';
        error = true;
        }
        if (endDate === '') {
        errorObj.endDate = 'Offer End Date is Required';
        error = true;
        }
        if (discountPercentage === '') {
        errorObj.discountPercentage = 'Discount Percentage is Required';
        error = true;
        }

        seterrors(errorObj);

            if(error){
                return
        }

        const offerData = { offerName, offerCode, offerDescription, startDate, endDate, discountPercentage };

        dispatch(editOfferById({ id, offerData, token }));
        
    }
    
    // go to offer detail on successful offer addition
    useEffect(() => {
        if (success && currentOffer) {
            navigate(`/offers/${currentOffer._id}`)
        }
    }, [currentOffer, navigate, success]);
    
    // display error
    useEffect(() => {
        if (error) {
        swal(error, "error");

        }
    }, [error]);

    // reset states on page exist
    useEffect(() => {
        return () => dispatch(resetOffer());
        
        }, [dispatch]);


  return (
     <Fragment>
      <PageTitle
        activeMenu="Edit Offer"
        motherMenu="Offer"
        pageContent="Offer"
      />

      <div className="center-60">  
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Please Edit Required Details</h4>
              </div>
              <div className="card-body">
                <div className="form-validation">
                  <form
                    className="form-valide"
                    action="#"
                    method="post"
                    onSubmit={handleSubmit}
                  >
                    <h4 className="text-secondary">Offer Information</h4>
                    <div className="form-group mb-3 row">
                      <label
                        className="col-lg-4 col-form-label"                  
                        htmlFor="val-offerName"             
                      >
                        Name Of The Offer
                        <span className="text-danger">*</span>
                        
                      </label>                   
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          id="val-offerName"
                          name="val-offerName"
                          placeholder="Like Referral, Seasonal, Gift Cards etc.   "
                          value={offerName}
                          onChange={(e)=> setofferName(e.target.value) }
                        />
                        
                      </div>
                      {errors.offerName && <div className="text-danger fs-12">{errors.offerName}</div>}
                    </div>
                    <div className="form-group mb-3 row">
                      <label
                        className="col-lg-4 col-form-label"                  
                        htmlFor="val-offerCode"             
                      >
                        Offer Code
                        <span className="text-danger">*</span>
                        
                      </label>                   
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          id="val-offerCode"
                          name="val-offerCode"
                          placeholder="Eg REF1014"
                          value={offerCode}
                          onChange={(e)=> setofferCode(e.target.value) }
                        />
                        
                      </div>
                      {errors.offerCode && <div className="text-danger fs-12">{errors.offerCode}</div>}
                    </div>
                    <div className="form-group mb-3 row">
                      <label
                        className="col-lg-4 col-form-label"                  
                        htmlFor="val-offerDescription"             
                      >
                        Offer Description
                        <span className="text-danger">*</span>
                        
                      </label>                   
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          id="val-offerDescription"
                          name="val-offerDescription"
                          placeholder="Details of the offer"
                          value={offerDescription}
                          onChange={(e)=> setofferDescription(e.target.value) }
                        />
                        
                      </div>
                      {/* not a mandatory field */}
                    </div>
                    <div className="form-group mb-3 row">
                      <label
                        className="col-lg-4 col-form-label"                  
                        htmlFor="val-startDate"             
                      >
                        Offer Starts At
                        <span className="text-danger">*</span>
                        
                      </label>                   
                      <div className="col-lg-6">
                        <input
                          type="date"
                          className="form-control"
                          id="val-startDate"
                          name="val-startDate"
                          value={startDate}
                          onChange={(e)=> setstartDate(e.target.value) }
                        />
                        
                      </div>
                      {errors.startDate && <div className="text-danger fs-12">{errors.startDate}</div>}
                    </div>
                    <div className="form-group mb-3 row">
                      <label
                        className="col-lg-4 col-form-label"                  
                        htmlFor="val-startDate"             
                      >
                        Offer Ends At
                        <span className="text-danger">*</span>
                        
                      </label>                   
                      <div className="col-lg-6">
                        <input
                          type="date"
                          className="form-control"
                          id="val-endDate"
                          name="val-endDate"
                          value={endDate}
                          onChange={(e)=> setendDate(e.target.value) }
                        />
                        
                      </div>
                      {errors.endDate && <div className="text-danger fs-12">{errors.endDate}</div>}
                    </div>
                    <div className="form-group mb-3 row">
                      <label
                        className="col-lg-4 col-form-label"                  
                        htmlFor="val-discountPercentage"             
                      >
                        Discount Percentage
                        <span className="text-danger">*</span>
                        
                      </label>                   
                      <div className="col-lg-6">
                        <input
                          type="number"
                          className="form-control"
                          id="val-discountPercentage"
                          name="val-discountPercentage"
                          placeholder="Enter Discount In Percentage"
                          value={discountPercentage}
                          onChange={(e)=> setdiscountPercentage(e.target.value) }
                        />
                        
                      </div>
                      {errors.discountPercentage && <div className="text-danger fs-12">{errors.discountPercentage}</div>}
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
      
    </Fragment>
  )

}

export default FormEditOffer