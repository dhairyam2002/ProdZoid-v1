    import axios from "axios";
    // import { NavLink } from "react-router-dom";

    import constants, { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQ, ALL_PRODUCT_SUC, CLEAR_ERR } from "../constants/productConstants";  


    export const getProduct = function(keyword = "", price=[0, 250000], rating=[0,5]){
        return async (dispatch) => {
            try {
                dispatch({type: ALL_PRODUCT_REQ});

                let link = `/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating[0]}&ratings[lte]=${rating[1]}`;

                const {data} = await axios.get(link);

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
