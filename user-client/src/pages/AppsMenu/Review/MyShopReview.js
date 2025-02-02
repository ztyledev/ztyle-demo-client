import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// components
import { ThemeContext } from "../../../context/ThemeContext";
import PageTitle from "../../../components/PageTitle";
import LoadingScreen from '../../../components/LoadingScreen';
import swal from 'sweetalert';

// actions
import {
    getMyShopReview,
    addShopReview,
    editShopReviewById
} from '../../../store/review/reviewActions';

import { resetReview } from '../../../store/review/reviewSlice';


const MyReview = () => {
    const dispatch = useDispatch();
    const { id } = useParams();    

    const { 
        changeSideBarStyle
            
    } = useContext(ThemeContext);
    useEffect(() => {
        changeSideBarStyle({ value: "modern", label: "Modern" });
    }, []);

    // auth redux states
    const { userInfo, token } = useSelector(state => state.auth);
    
    useEffect(() => {
        const searchData = { shopId: id, userId: userInfo._id }
        dispatch(getMyShopReview({ searchData, token }))
        
    }, [dispatch, id, token, userInfo._id]);
    
    // review redux states
    const { loading, currentShopReview, success } = useSelector(state => state.review);
   

    // error object for validation
    let errorsObj = { rating: '', reviewText: '' };
    const [errors, setErrors] = useState(errorsObj);
  
    // fields
    const [rating, setrating] = useState('');
    const [reviewText, setreviewText] = useState('');
    const [hover, sethover] = useState('');
    
    const totalStars = 5;

    useEffect(() => {
        if (currentShopReview) {
            setrating(currentShopReview.rating)
            setreviewText(currentShopReview.reviewText)
        }
    }, [currentShopReview]);


    const handleSubmit = () => {
         
        let error = false;
        const errorObj = { ...errorsObj };
        if (rating === '') {
            errorObj.rating = 'Rating is Required';
            error = true;
        }
        if (reviewText === '') {
            errorObj.reviewText = 'Review is Required';
            error = true;
        }
        
        setErrors(errorObj)
        if (error) {
            return
        }
        const reviewData = { userId: userInfo._id, shopId: id, rating, reviewText }
         
        if (currentShopReview) {
            dispatch(editShopReviewById({ reviewData, id: currentShopReview._id, token }))
        }
        else {
            dispatch(addShopReview({ reviewData, token }))
        }
         
    }

    // success message
    useEffect(() => {
        if (success) {
            swal("Your Review Submitted Succefully", "success")
        }
    }, [success]);

    // reset state on exit
    useEffect(() => {
        return () => dispatch(resetReview())
    }, [dispatch]);


    if (loading) {
        return (
            <div>
                <LoadingScreen />
            </div>
        )
    }

    else if (currentShopReview) {

        return (
            <Fragment>
                <PageTitle activeMenu="Rating & Review" motherMenu="Shop" />           
                <div className="card">         
                    <div className="card-body">
                        <h2 className="text-secondary text-center">Rating And Review Of Shop</h2>
                        <p className="text-info text-center">You Have Already Submitted A Review To This Shop. Edit The Review</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-3 col-xxl-4">
                            <Card>
                                <Card.Header className="d-block">
                                        <Card.Title > Purpose Of This Review</Card.Title>
                                        
                                </Card.Header>
                            <Card.Body>
                                <p>
                                    We can understand the experience you have obtained from this shop.
                                </p>
                                <p>
                                    This will enable us to improve the service offered to you.
                                </p>
                                    
                            </Card.Body>
                            <Card.Header className="d-block">
                                        <Card.Title > How To Review A Shop</Card.Title>
                                        
                                </Card.Header>
                            <Card.Body>
                                <p>
                                    share your experience with the services, cleanliness, staff professionalism, and overall atmosphere, providing specific details about what stood out to you.
                                </p>
                                <p>
                                    Be honest and constructive in your feedback, mentioning any areas for improvement and whether you'd recommend the salon to others.
                                </p>
                            </Card.Body>
                        </Card>
                        
                    </div>
                    <div className="col-xl-9 col-xxl-8">
                        <Card>
                            <Card.Header className="d-block">
                                <Card.Title >Please Rate This Shop </Card.Title>
                            </Card.Header>
                            
                                <div className='rating-container'>
                                    {[...Array(totalStars)].map((star, idx) => {
                                        const currentRating = idx + 1;                        
                                        return (                                  
                                            <label key={idx} className='review-label'>
                                                <input
                                                    type="radio" 
                                                    name="rating"
                                                    id="rating"
                                                    value={currentRating}
                                                    onChange={()=>setrating(currentRating)}
                                                />
                                                <span
                                                    className='star'
                                                    style={{
                                                        color: currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"

                                                    }}
                                                    onMouseEnter={() => sethover(currentRating)}
                                                    onMouseLeave={() => sethover('')}
                                                >
                                                    &#9733;                                             
                                                </span>                                  
                                            </label>
                                        );

                                    })}
                                {errors.rating && <div className="text-danger fs-12">{errors.rating}</div>}
                                </div>
                            
                            <Card.Header className="d-block">
                                <Card.Title >Please Review This Shop </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <textarea
                                    className='review-text'    
                                    name="review"           
                                    id="review"            
                                    rows={8}           
                                    cols={50}          
                                    placeholder='write your opinion about this shop'      
                                    value={reviewText}           
                                    onChange={(e) => setreviewText(e.target.value)}         
                                >            
                                </textarea>
                                {errors.reviewText && <div className="text-danger fs-12">{errors.reviewText}</div>}
                                <div  className='review-submit'>
                                    <button className='btn btn-secondary' onClick={handleSubmit}> Submit</button>
                                </div>
                            </Card.Body>
                        </Card>                
                    </div>
                </div>
            </Fragment>
        )    
    }

    else {
        return (
            <Fragment>
                <PageTitle activeMenu="Add A Review" motherMenu="Shop" />           
                <div className="card">         
                    <div className="card-body">
                        <h2 className="text-secondary text-center">Rating And Review Of Shop</h2>
                        <p className="text-info text-center">You Haven't Submit Any Review To This Shop. Add A Review</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-3 col-xxl-4">
                            <Card>
                                <Card.Header className="d-block">
                                        <Card.Title > Purpose Of This Review</Card.Title>
                                        
                                </Card.Header>
                            <Card.Body>
                                <p>
                                    We can understand the experience you have obtained from this shop.
                                </p>
                                <p>
                                    This will enable us to improve the service offered to you.
                                </p>
                                    
                            </Card.Body>
                            <Card.Header className="d-block">
                                        <Card.Title > How To Review A Shop</Card.Title>
                                        
                                </Card.Header>
                            <Card.Body>
                                <p>
                                    share your experience with the services, cleanliness, staff professionalism, and overall atmosphere, providing specific details about what stood out to you.
                                </p>
                                <p>
                                    Be honest and constructive in your feedback, mentioning any areas for improvement and whether you'd recommend the salon to others.
                                </p>
                            </Card.Body>
                        </Card>
                        
                    </div>
                    <div className="col-xl-9 col-xxl-8">
                        <Card>
                            <Card.Header className="d-block">
                                <Card.Title >Please Rate This Shop </Card.Title>
                            </Card.Header>
                            
                                <div className='rating-container'>
                                    {[...Array(totalStars)].map((star, idx) => {
                                        const currentRating = idx + 1;                        
                                        return (                                  
                                            <label key={idx} className='review-label'>
                                                <input
                                                    type="radio" 
                                                    name="rating"
                                                    id="rating"
                                                    value={currentRating}
                                                    onChange={()=>setrating(currentRating)}
                                                />
                                                <span
                                                    className='star'
                                                    style={{
                                                        color: currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"

                                                    }}
                                                    onMouseEnter={() => sethover(currentRating)}
                                                    onMouseLeave={() => sethover('')}
                                                >
                                                    &#9733;                                             
                                                </span>                                  
                                            </label>
                                        );

                                    })}
                                {errors.rating && <div className="text-danger fs-12">{errors.rating}</div>}
                                </div>
                            
                            <Card.Header className="d-block">
                                <Card.Title >Please Review This Shop </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <textarea
                                    className='review-text'    
                                    name="review"           
                                    id="review"            
                                    rows={8}           
                                    cols={50}          
                                    placeholder='write your opinion about this shop'      
                                    value={reviewText}           
                                    onChange={(e) => setreviewText(e.target.value)}         
                                >            
                                </textarea>
                                {errors.reviewText && <div className="text-danger fs-12">{errors.reviewText}</div>}
                                <div  className='review-submit'>
                                    <button className='btn btn-secondary' onClick={handleSubmit}> Submit</button>
                                </div>
                            </Card.Body>
                        </Card>                
                    </div>
                </div>
            </Fragment>
        )    
    }

}

export default MyReview