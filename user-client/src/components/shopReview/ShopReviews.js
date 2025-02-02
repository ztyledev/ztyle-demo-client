import React, { useState, useEffect } from 'react';
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from 'react-redux';

/// components
import SingleShopReview from './SingleShopReview';
import LoadingScreen from '../LoadingScreen';
import swal from 'sweetalert';

//actions
import { getShopReviews } from '../../store/review/reviewActions';



const ShopReviews = () => {
	
	const dispatch = useDispatch();

	// redux states
	const { token } = useSelector(state => state.auth);
	const { currentShop} = useSelector(state => state.shop);


	useEffect(() => {
		if (currentShop) {
			const id = currentShop.shopId;
			dispatch(getShopReviews({ id, token }))
    }
	}, [currentShop, dispatch, token]);
	

	// review redux states
	const { loading, shopReviews,error } = useSelector(state => state.review);
	
	// // display error
	// useEffect(() => {
	// 	if (error) {
	// 		swal(error, "error");
	// 	}
	// }, [error]);
	
	
	if (loading) { 
		return (
			<div>
				<LoadingScreen />
			</div>
		)
	}

	else {
		return (
			<>
				<div className="card">
					<div className="card-header border-0">
						<h4 className="card-title">User Reviews</h4>
					</div>
					<PerfectScrollbar className="card-body customer-review-bx p-0 dz-scroll loadmore-content" id="customerReviewContent">
						{currentShop ?
							shopReviews ? shopReviews.map(review => <SingleShopReview key={review.id} review={review} />) :
								<div className="text-danger text-center ">
									No reviews found. please wait a while for a user to submit review.	
								</div>
							:
							<div className="text-danger text-center ">
									No shop exists for this shop Id. 
							</div>
							
						}
					</PerfectScrollbar>
				
				</div>
			
			</>
		)
	}

} 

export default ShopReviews;
