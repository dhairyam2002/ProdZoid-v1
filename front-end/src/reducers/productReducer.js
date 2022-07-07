import constants, { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQ, ALL_PRODUCT_SUC, CLEAR_ERR } from "../constants/productConstants";  

export const productReducer = ((state = {products: []}, action)=>{
    // console.log(state + " " + action.type);
    switch (action.type) {
        case ALL_PRODUCT_REQ:
            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCT_SUC :
            return {
                loading: false,
                products: action.payload.products
            }
        case ALL_PRODUCT_FAIL:{
            return {
                loading: false,
                error: action.payload
            }
        }
        case CLEAR_ERR:{
            return {
                ...state,
                error: null 
            }
        }
        default:
            return state;
    }
})