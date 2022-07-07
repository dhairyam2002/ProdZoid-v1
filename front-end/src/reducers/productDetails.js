import { DETAILS_FAIL, DETAILS_REQ, DETAILS_SUC, CLEAR_ERR} from "../constants/productConstants";


export const productDetails = (state = { productDetail: [] }, action) => {
    switch (action.type) {
        case DETAILS_REQ:
            return {
                loading: true,
                productDetail: []
            }
        case DETAILS_SUC:
            return {
                loading: false,
                productDetail: action.payload.product
            }   
        case DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERR: {
            return {
                ...state,
                error: null
            }
        }
        default:
            return state;
    }
}