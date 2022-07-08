import axios from "axios";
// import { NavLink } from "react-router-dom";

import constants, { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQ, ALL_PRODUCT_SUC, CLEAR_ERR } from "../constants/productConstants";  


export const getProduct = function(keyword = ""){
    return async (dispatch) => {
        try {
            dispatch({type: ALL_PRODUCT_REQ});
            // console.log(keyword);
            console.log(`api/v1/products?keyword=${keyword}`)
            let link = `api/v1/products?keyword=${keyword}`;
            console.log(link);
            // console.log(response);
            const {data} = await axios.get(link);
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
