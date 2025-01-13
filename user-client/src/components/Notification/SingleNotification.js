import React, { useEffect, useState } from 'react';

// data 
import { monthdata } from '../../data/monthdata';

// utils 
import getInitials from '../../utils/getInitials';
import { getStandardTime } from '../../utils/getStandardTime';

const SingleNotification = (props) => {

    const not = props.not;
    // initials from full name
    const initials = getInitials(not.senderName);
    
    // notification date
    const createdAt = not.createdAt;

    // access slit date
    const date=new Date(createdAt);
    const Day = date.getDate();
    const Month = date.getMonth();
    const Year = date.getFullYear();

    // access time from date 
    let result = createdAt.match(/\d\d:\d\d/);
    
    const time = getStandardTime(result[0]);
    
    // states
    const [initClass, setinitClass] = useState('');
    
    useEffect(() => {
        if (not.message === "Service Booking Requested") {
            setinitClass('media-warning')
        }
        else if (not.message === "Service Booking Canceled") {
            setinitClass('media-danger')
        }
        else if (not.message === "Service Booking Confirmed") {
            setinitClass('media-info')
        }
        else if (not.message === "Service Booking Completed") {
            setinitClass('media-success')
        }
    }, [not.message]);


    return (
        <>
            <li>
                <div className="timeline-panel">
                    <div className={`media me-2  ${initClass}`}>
                        {initials}
                    </div>
                    <div className="media-body text-center">
                        <h6 className="mb-1">{not.senderName} :{not.message}</h6>
                        <small className="d-block">{Day} {monthdata[Month]} {Year} - {time }</small>
                    </div>
                </div>
          </li>
      </>
    )
}

export default SingleNotification