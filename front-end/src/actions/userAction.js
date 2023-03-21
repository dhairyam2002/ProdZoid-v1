import axios from "axios";
import { FP_FAIL, FP_REQ, FP_SUC, LOAD_FAIL, LOAD_REQ, LOAD_SUC, LOG_OUT_FAIL, LOG_OUT_REQ, LOG_OUT_SUC, REGISTER_FAIL, REGISTER_REQ, REGISTER_SUC, RP_FAIL, RP_REQ, RP_SUC, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQ, UPDATE_PASSWORD_SUC, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQ, UPDATE_PROFILE_SUC } from "../constants/userConstants";
import { LOGIN_REQ, LOGIN_SUC, LOGIN_FAIL, CLEAR_ERR } from "../constants/userConstants";

export const loginUser = function (login) {
    return async function (dispatch) {
        try {
            dispatch({
                type: LOGIN_REQ,
                // isAuthenticated: false
            })
            const { data } = await axios.post("/api/v1/login", {
                email: login.email,
                password: login.password
            })
            if (data.success === true) {
                dispatch({
                    type: LOGIN_SUC,
                    // isAuthenticated: true,
                    payload: data.user
                })
            }
            else {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: data.message
                })
            }


        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                // isAuthenticated: false,
                error: error.response.data.message
            })
        }
    }
}

export const registerUser = function (userDetails) {
    return async function (dispatch) {
        try {
            dispatch({ type: REGISTER_REQ });
            const { data } = await axios.post("/api/v1/register", userDetails);

            if (data.success === true) {
                dispatch({
                    type: REGISTER_SUC,
                    payload: data.user
                })
            }
            else {
                dispatch({
                    type: REGISTER_FAIL,
                    payload: data.message
                })
            }
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.message
            })
        }
    }
}

export const loadUser = function (loadUser) {
    return async function (dispatch) {
        try {
            dispatch({ type: LOAD_REQ });

            const { data } = await axios.get("/api/v1/me");
            if (data.success === true) {
                dispatch({
                    type: LOAD_SUC,
                    payload: data.user
                })
            }
            else {
                dispatch({
                    type: LOAD_FAIL,
                    error: "Login required!"
                })
            }

        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                error: error.response.data.message
            })
        }
    }
}

export const updatePassword = function (passwords) {
    return async (dispatch) => {
        try {
            dispatch({
                type: UPDATE_PASSWORD_REQ
            })

            const {data} = await axios.put("/api/v1/password/update", passwords);
            if(data.success === true){
                dispatch({
                    type: UPDATE_PASSWORD_SUC,
                    payload: data.message
                })
            }

            else{
                dispatch({
                    type: UPDATE_PASSWORD_FAIL,
                    error: "Old Password incorrect!"
                })
            }
        } catch (error) {
            dispatch({
                type: UPDATE_PASSWORD_FAIL,
                error: "Old password incorrect!"
            })
        }   
    }
}
export const updateUserDetails = function (details) {
    return async (dispatch) => {
        try {
            const { data } = await axios.put("/api/v1/me/update", details)
            if (data.success === true) {
                dispatch({
                    type: UPDATE_PROFILE_SUC,
                    payload: data.user
                })
            }

            else {
                dispatch({
                    type: UPDATE_PROFILE_FAIL,
                    payload: data.user,
                    error: data.message
                })
            }

        } catch (error) {
            dispatch({
                type: UPDATE_PROFILE_FAIL,
                error: error.response.data.message
            })
        }


    }
}

export const logOutUser = function () {
    return async (dispatch) => {
        try {
            dispatch({ type: LOG_OUT_REQ });
            const { data } = await axios.get("/api/v1/logout");
            if (data.success == true) {
                dispatch({
                    type: LOG_OUT_SUC,
                    payload: data.message
                })
            }

        } catch (error) {
            dispatch({
                type: LOG_OUT_FAIL,
                error: error.response.data.message
            })
        }

    }
}

export const forgotPassword = function (email) {
    return async (dispatch) => {
        try {
            dispatch({
                type: FP_REQ
            })

 
            const { data } = await axios.post("/api/v1/password/forgot", {email: email});

            if (data.success === true) {
                dispatch({
                    type: FP_SUC,
                    payload: data.message
                })
            }
            else {
                dispatch({
                    type: FP_FAIL,
                    error: data.message
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: FP_FAIL,
                error: error.response.data
            })
        }

    }
}


export const resetPassword = function(rp) {
    return async (dispatch) => {
        try {
            dispatch({
                type: RP_REQ
            })
            const password = {
                password: rp.passwords.newPassword,
                confirmPassword: rp.passwords.confirmPassword
            }
            let link = `/api/v1/password/reset/${rp.token}`;
            const {data} = await axios.put(link, password);
            if(data.success === true){
                dispatch({
                    type: RP_SUC,
                    payload: "Password reset succesful, now you can login"
                })
            }
            else{
                dispatch({
                    type: RP_FAIL,
                    error: "Token expired!"
                })
            }
        } catch (error) {
            dispatch({
                type: RP_FAIL,
                error
            })
        }
        
    }
}

