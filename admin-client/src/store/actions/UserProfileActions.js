export const SET_USER_PROFILE="user profile set";
export const CLEAR_USER_PROFILE="user profile cleared";


export function setUserProfile(data){
    return(dispatch)=>{
        localStorage.setItem('userProfile',JSON.stringify(data));

        dispatch(setUserProfileData(data));
    }

}

export function setUserProfileData(data){
    
    return{
        type:SET_USER_PROFILE,
        payload:data
    }
    
}

export function clearUserProfile(){
    return{
        type:CLEAR_USER_PROFILE
    }
}
