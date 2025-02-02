import React from 'react';

import defaultProfilePic from '../../images/avatar/beauticianProfilePic.png'

const SingleBeauticianReview= (props) => {
    const {
        userId,
        rating,
        updatedAt,
        reviewText
    } = props.review;
    

    const createdDate = new Date(updatedAt);
    const Day =createdDate.getDate();
    const Month = createdDate.getMonth() + 1;
    const Year = createdDate.getFullYear();
    const Hours = createdDate.getHours();
    const Minutes = createdDate.getMinutes();
    
    
  return (
      <div className="dz-review-bx" >
          <img className="dz-media me-4" src={defaultProfilePic} alt="profile-pic" />
          <div className="dz-info">
              <div className="dz-name mb-3">
                  <div>
                      <h6 className="title mb-1">User : {userId}</h6>
                      <ul className="star-review">
                          {
                              [...Array(5)].map((star, idx) => {
                                  const currentRating = idx + 1;
                                  return (
                                      <li><i className={currentRating <= rating ? "fas fa-star orange" : "fas fa-star"}></i></li>
                                  ) 
                              })
                          }
                        
                      </ul>
                      <span className="date text-black op8">Review submitted  on {`${Day}/${Month}/${Year}`} , at {`${Hours}:${Minutes}`}</span>
                  </div>
                  
              </div>
              <div >
                  <p className="text-black op8 mb-sm-0 mb-3 me-4">{ reviewText?reviewText:"This field is empty"}</p>
                  
              </div>
              
          </div>
      </div>
      
  )
}

export default SingleBeauticianReview