import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { Modal,Button } from 'react-bootstrap';



// actions
import { resetAuth } from '../store/auth/authSlice';
import { resetAdmin } from '../store/admin/adminSlice';
import { resetBeautician } from '../store/beautician/beauticianSlice';
import { resetShop } from '../store/shop/shopSlice';
import { deactivateAccount } from '../store/auth/authActions';


const AccountDeactivate = () => {
    const dispatch = useDispatch();

    // modal for deactivation
    const [basicModal, setbasicModal] = useState(false);
    // field
    const [id, setid] = useState('');
    // redux state
    const { adminInfo, token } = useSelector(state => state.auth);
    
    


  useEffect(() => {
    if (adminInfo) {
      setid(adminInfo._id)

    }
  }, [adminInfo]);
    
  
  const handleDeactivate = () => {
      setbasicModal(false);
      dispatch(deactivateAccount({ id, token }));
      dispatch(resetAdmin());
      dispatch(resetBeautician());
      dispatch(resetShop());
      dispatch(resetAuth());
      
  }
  
    return (
        <>
            <Modal className="fade" show={basicModal}>
                <Modal.Header>
                    <Modal.Title>Are You Sure You want to Deactivate Your Ztyle Account </Modal.Title>
                    <Button
                      variant=""
                      className="btn-close"
                      onClick={() => setbasicModal(false)}
                    >
                      
                    </Button>
                  </Modal.Header>
                  <Modal.Body> Once Your Account is Deactivated, you can never get it back. Click Delete if you still want to delete .. . otherwise click close</Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => setbasicModal(false)}
                      variant="danger light"
                    >
                      Close
                    </Button>
            <Button variant="primary"
              onClick={handleDeactivate}
              
            >
              
						Deactivate
            </Button>
            
                  </Modal.Footer>
            </Modal>

            <Link className="dropdown-item ai-icon" onClick={() => setbasicModal(true)}>
                <svg
                  id="icon-logout" xmlns="http://www.w3.org/2000/svg"
                  className="text-danger" width={18} height={18} viewBox="0 0 24 24" 
                  fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                >
                      <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
                    
                </svg>
                
              
                   <span className="ms-2" >Deactivate</span>
                
               <p> Ztyle Account</p> 
           
                
            </Link>
      
        </>
    )
}

export default AccountDeactivate