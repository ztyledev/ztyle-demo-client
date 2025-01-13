import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// components
import SingleNotification from './SingleNotification';

// actions
import {
    getNotifications,
} from '../../store/notification/notificationActions';


const Notifications = () => {
    const dispatch = useDispatch();

    // redux state
    const { token } = useSelector(state => state.auth);
    const { beauticianProfile } = useSelector(state => state.beauticianProfile);

    // notification
        useEffect(() => {
            if (beauticianProfile) {
                dispatch(getNotifications({ id: beauticianProfile._id, token }))
            }
            
        }, [beauticianProfile, dispatch, token]);
        
    const { notification } = useSelector(state => state.notification);
    


    return (
        <ul className="timeline">
			{
              notification ?
                  
                notification.notifications?.map((not, idx) => <SingleNotification key={idx} not={not} />)
                :
                <div className='text-center'>
                    <li>
                        <div className="timeline-panel">
                            <div className="media-body">
                                <h6 className="mb-1">No New Notifications</h6>
                                
                            </div>
                        </div>
                    </li>
                </div>														
              }
            							
        </ul>
                  
  )
}

export default Notifications