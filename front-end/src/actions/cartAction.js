import axios from 'axios';
import { ADD_TO_CART } from '../constants/cartConstant';


export const addToCart = function(id, quantity){
    return async(dispatch, getState) => {
        try {
            const {data} = await axios.get(`/api/v1/product/${id}`);
            dispatch({
                type: ADD_TO_CART,
                payload: {
                    pid : data.product._id,
                    name: data.product.name,
                    price: data.product.price,
                    image: data.product.images[0].url,
                    stock: data.product.stock,
                    quantity,
                }
            })
            localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
        } catch (error) {
            console.log(error);
        }
        
        
    }
}