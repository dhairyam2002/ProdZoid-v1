import axios from "axios";

import constants, { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQ, ALL_PRODUCT_SUC, CLEAR_ERR } from "../constants/productConstants";  


export const getProduct = function(){
    return async (dispatch) => {
        try {
            dispatch({type: ALL_PRODUCT_REQ});
            const {data} = await axios.get("api/v1/products");
            // console.log(data);
            dispatch({
                type: ALL_PRODUCT_SUC,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: ALL_PRODUCT_FAIL,
                payload: error.response.data.message
            })
        }
    }
}


export const clearErrors = function(){
    return async(dispatch) => dispatch({type: CLEAR_ERR})
} 
