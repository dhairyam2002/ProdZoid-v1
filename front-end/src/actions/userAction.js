import axios from "axios";
import { Action } from "history";
import { LOAD_FAIL, LOAD_REQ, LOAD_SUC, REGISTER_FAIL, REGISTER_REQ, REGISTER_SUC } from "../constants/userConstants";
import {LOGIN_REQ, LOGIN_SUC, LOGIN_FAIL, CLEAR_ERR} from "../constants/userConstants";

export const loginUser = function(login){
    return async function(dispatch){
        try {
            dispatch({
                type: LOGIN_REQ,
                // isAuthenticated: false
            })
            const {data} = await axios.post("/api/v1/login", {
                email: login.email,
                password: login.password
            })
            console.log(data);
            if(data.success === true){
                dispatch({
                    type: LOGIN_SUC,
                    // isAuthenticated: true,
                    payload: data.user
                })
            }
            else{
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

export const registerUser = function(userDetails){
    return async function(dispatch){
        try {
            dispatch({type: REGISTER_REQ});
            const {data} = await axios.post("/api/v1/register" , userDetails);

            if(data.success === true){
                dispatch({
                    type: REGISTER_SUC,
                    payload: data.user
                })
            }
            else{
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

export const loadUser = function(loadUser){
    return async function(dispatch){
        try {
            dispatch({type: LOAD_REQ});

            const {data} = await axios.get("/api/v1/me");

            if(data.success === true){
                dispatch({
                    type: LOAD_SUC,
                    payload: data.user
                })
            }
            else{
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