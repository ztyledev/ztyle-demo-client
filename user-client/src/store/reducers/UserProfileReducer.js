import{SET_USER_PROFILE,CLEAR_USER_PROFILE} from '../actions/UserProfileActions' ;

const initialState={
    profile:'',
    message:''
}

export function userProfileReducer(state=initialState,action){
    if(action.type===SET_USER_PROFILE){
        return{
            ...state,
            profile:action.payload,
            message:'user profile set successfully'
        }
    }
    else if(action.type===CLEAR_USER_PROFILE){
        return{
            ...state,
            profile:'',
            message:'user profile is currently cleared'
        }
    }
    return state;

}
