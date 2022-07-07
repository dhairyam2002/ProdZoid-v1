import axios from "axios";
import { DETAILS_FAIL, DETAILS_REQ, DETAILS_SUC } from "../constants/productConstants";


export const getProductDetail = function(id){
    return async (dispatch) => {
        try {
            dispatch({type: DETAILS_REQ});

            const {data} = await axios.get("/api/v1/product/" + id);

            dispatch({
                type: DETAILS_SUC,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: DETAILS_FAIL,
                payload: error.response.data.message
            })
        }
    }
}