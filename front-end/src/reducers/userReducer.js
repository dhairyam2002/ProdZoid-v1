import { LOAD_FAIL, LOAD_REQ, LOAD_SUC, REGISTER_FAIL, REGISTER_REQ, REGISTER_SUC } from "../constants/userConstants";
import {LOGIN_REQ, LOGIN_SUC, LOGIN_FAIL, CLEAR_ERR} from "../constants/userConstants";

export const userReducer = (state = { user: [] }, action) => {
    switch (action.type) {
        case LOGIN_REQ:
            return {
                loading: true,
                isAuthenticated: false,
                user: []
            }
        case LOGIN_SUC:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGIN_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload
            }
        
        case REGISTER_REQ:
            return {
                loading: true,
                isAuthenticated: false,
                user: []
            }
        case REGISTER_SUC:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case REGISTER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload
            }
        case LOAD_REQ : 
            return {
                loading: true,
                isAuthenticated: false,
                user: []
            }
        

        case LOAD_SUC : 
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        

        case LOAD_FAIL : 
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload
            }
        
        case CLEAR_ERR: 
            return {
                ...state,
                error: null
            }
        
        default:
            return state;
    }
}