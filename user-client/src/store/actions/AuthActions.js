import {
    formatError,
    login,
    runLogoutTimer,
    saveTokenInLocalStorage,
    signUp,
} from '../../services/AuthService';



export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed login';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const LOGOUT_ACTION = '[Logout action] logout action';

export function signupAction(email, password, history) {
    return (dispatch) => {
        signUp(email, password)
        .then((response) => {

            let newresp = {
                "kind": "identitytoolkit#VerifyPasswordResponse",
                "localId": "qmt6dRyipIad8UCc0QpMV2MENSy1",
                "email": email,
                "displayName": "",
                "idToken": "AIwUaOlFeuO2hR6-m-eLByRvNGG9pu8BIrj3fBybOmsvxv8OT0-aOLsoaDERc-VS4XZJDQSdO3SgNLvyh72n6SZYKWV9V7li1FylIcsctCb3Ji6CVoFH0t6VUeorOwKnHkxYqChUiGRCJjRVy-Xd5rLrYaYS2cVat_BAEb_xH-Tm2DVILyulTw4dG6HeKeBqTCMYHNGqbonQvYIPcTOa0j22gMJXes4WsA",
                "registered": true,
                "refreshToken": "AIwUaOlFeuO2hR6-m-eLByRvNGG9pu8BIrj3fBybOmsvxv8OT0-aOLsoaDERc-VS4XZJDQSdO3SgNLvyh72n6SZYKWV9V7li1FylIcsctCb3Ji6CVoFH0t6VUeorOwKnHkxYqChUiGRCJjRVy-Xd5rLrYaYS2cVat_BAEb_xH-Tm2DVILyulTw4dG6HeKeBqTCMYHNGqbonQvYIPcTOa0j22gMJXes4WsA",
                "expiresIn": "3600",
                "token" : "AIwUaOlFeuO2hR6-m-eLByRvNGG9pu8BIrj3fBybOmsvxv8OT0-aOLsoaDERc-VS4XZJDQSdO3SgNLvyh72n6SZYKWV9V7li1FylIcsctCb3Ji6CVoFH0t6VUeorOwKnHkxYqChUiGRCJjRVy-Xd5rLrYaYS2cVat_BAEb_xH-Tm2DVILyulTw4dG6HeKeBqTCMYHNGqbonQvYIPcTOa0j22gMJXes4WsA"
              }
        
            saveTokenInLocalStorage(newresp);
            runLogoutTimer(
                dispatch,
                30 * 60 * 1000,
                history,
            );
            dispatch(confirmedSignupAction(newresp));
            history.push('/dashboard');
        })
        .catch((error) => {
            const errorMessage = formatError(error.response.data);
            dispatch(signupFailedAction(errorMessage));
        });
    };
}

export function logout(history) {
    localStorage.removeItem('userDetails');
    history.push('/login');
    return {
        type: LOGOUT_ACTION,
    };
}



export function loginAction(email, password, history) {
    return (dispatch) => {
        login(email, password)
            .then((response) => {
                console.log({responsenew : response});
                let newresp = {
                    "kind": "identitytoolkit#VerifyPasswordResponse",
                    "localId": "qmt6dRyipIad8UCc0QpMV2MENSy1",
                    "email": email,
                    "displayName": "",
                    "idToken": response.data.token,
                    "registered": true,
                    "refreshToken": "AIwUaOlFeuO2hR6-m-eLByRvNGG9pu8BIrj3fBybOmsvxv8OT0-aOLsoaDERc-VS4XZJDQSdO3SgNLvyh72n6SZYKWV9V7li1FylIcsctCb3Ji6CVoFH0t6VUeorOwKnHkxYqChUiGRCJjRVy-Xd5rLrYaYS2cVat_BAEb_xH-Tm2DVILyulTw4dG6HeKeBqTCMYHNGqbonQvYIPcTOa0j22gMJXes4WsA",
                    "expiresIn": "36000000"
                  }

                  newresp.token = response.data.token

                saveTokenInLocalStorage(newresp);
                runLogoutTimer(
                    dispatch,
                    30 * 60 * 1000 * 10,
                    history,
                );
                dispatch(loginConfirmedAction(newresp));
				history.push('/dashboard');                
            })
            .catch((error) => {
			//    console.log(error);
                const code =error.response.data.error.statusCode;
                console.log(error.response.data);

                

                let errorResponse={};

                if(code===401){
                    
                    errorResponse={
                        error:{
                            message:"INVALID_PASSWORD"
                        }
                    }
                    formatError(errorResponse);
                   

                }
                
                else{
                    console.log("unknown error")
                }
                // errorMessage = formatError(error.response.data);
                
               
                dispatch(loginFailedAction(errorResponse.error.message));
            });
    };
}

export function loginFailedAction(data) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: data,
    };
}

export function loginConfirmedAction(data) {
    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: data,
    };
}

export function confirmedSignupAction(payload) {
    return {
        type: SIGNUP_CONFIRMED_ACTION,
        payload,
    };
}

export function signupFailedAction(message) {
    return {
        type: SIGNUP_FAILED_ACTION,
        payload: message,
    };
}

export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}
