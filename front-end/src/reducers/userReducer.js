import { FP_FAIL, FP_REQ, FP_SUC, LOAD_FAIL, LOAD_REQ, LOAD_SUC, LOG_OUT_SUC, REGISTER_FAIL, REGISTER_REQ, REGISTER_SUC, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQ, UPDATE_PASSWORD_SUC, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQ, UPDATE_PROFILE_SUC } from "../constants/userConstants";
import { LOGIN_REQ, LOGIN_SUC, LOGIN_FAIL, CLEAR_ERR } from "../constants/userConstants";

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
        case LOAD_REQ:
            return {
                loading: true,
                isAuthenticated: false,
                user: []
            }


        case LOAD_SUC:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }


        case LOAD_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload
            }


        case UPDATE_PROFILE_REQ:
            return {
                loading: true,
                isAuthenticated: true,
                user: []
            }

        case UPDATE_PROFILE_SUC:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case UPDATE_PROFILE_FAIL:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload,

                error: action.payload.message
            }

        case LOG_OUT_SUC:
            return {
                loading: false,
                isAuthenticated: false,
                user: []
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


export const updatePasswordReducer = (state = { isUpdated: [] }, action) => {
    switch (action.type) {
        case UPDATE_PASSWORD_REQ:
            return {
                loading: true,
            }
        case UPDATE_PASSWORD_SUC:
            return {
                loading: false,
                isUpdated: "Password Updated successfully!"
            }
        case UPDATE_PASSWORD_FAIL:
            return {
                loading: false,
                error: "Old password incorrect!"
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


export const forgotPasswordReducer = (state = { message: [] }, action) => {
    switch (action.type) {
        case FP_REQ:
            return {
                loading: true,
                message: []
            }
        case FP_SUC:
            return {
                loading: false,
                message: action.payload
            }
        case FP_FAIL:
            return {
                loading: false,
                error: "User not found!"
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

export const resetPasswordReducer = (state = {message : []}, action) => {
    switch (action.type) {
        case FP_REQ:
            return {
                loading: true,
                message: []
            }
        case FP_SUC:
            return {
                loading: false,
                message: action.payload
            }
        case FP_FAIL:
            return {
                loading: false,
                error: "Token expired!"
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