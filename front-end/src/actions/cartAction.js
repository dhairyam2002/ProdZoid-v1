import axios from 'axios';
import { ADD_TO_CART, REMOVE_FROM_CART, SHIPPING_INFO } from '../constants/cartConstant';


export const addToCart = function (id, quantity) {
    return async (dispatch, getState) => {
        try {
            const { data } = await axios.get(`/api/v1/product/${id}`);
            dispatch({
                type: ADD_TO_CART,
                payload: {
                    pid: data.product._id,
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

export const removeFromCart = function (id) {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: REMOVE_FROM_CART,
                payload: id
            })
            localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
        } catch (error) {
            console.log(error);
        }

    }
}

export const shippingIn = function(data){
    return async (dispatch)=>{
        dispatch({
            type: SHIPPING_INFO,
            payload: data
        })
        localStorage.setItem("shippingInfo", JSON.stringify(data));
    }
}