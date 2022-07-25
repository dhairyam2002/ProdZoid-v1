import axios from "axios";


import { ALL_ORDERS_FAIL, ALL_ORDERS_SUC, CREATE_ORDER_FAIL, CREATE_ORDER_REQ, CREATE_ORDER_SUC, MY_ORDER_FAIL, MY_ORDER_REQ, MY_ORDER_SUC, SINGLE_ORDER_FAIL, SINGLE_ORDER_SUC } from "../constants/orderConstant"

export const createOrder = function (details) {
    return async (dispatch) => {
        try {
            dispatch({ type: CREATE_ORDER_REQ });

            const config = {
                header: {
                    "Content-type" : "application/json"
                }
            }
            const { data } = await axios.post("/order/new", details, config);

            dispatch({
                type: CREATE_ORDER_SUC,
                payload: data
            })


        } catch (error) {
            console.log(error);
            dispatch({
                type: CREATE_ORDER_FAIL,
                error: error.data.response.message
            })
        }

    }
}

export const myOrders = function(user) {
    return async (dispatch) => {
        try {
            dispatch({
                type: MY_ORDER_REQ
            })

            const {data} = await axios.get("/orders/user");
            dispatch({
                type: MY_ORDER_SUC,
                payload: data.orders
            })
        } catch (error) {
            dispatch({
                type: MY_ORDER_FAIL,
                payload: error.response.data.message
            })
        }
    }
}

export const singleOrder = function(id) {
    return async (dispatch) => {
        try {
            const {data} = await axios.get(`/order/${id}`);
            dispatch({
                type: SINGLE_ORDER_SUC,
                payload: data.orderDetails
            })
        } catch (error) {
            dispatch({
                type: SINGLE_ORDER_FAIL,
                error
            })
        }
    }
}

export const getAllOrders = function(keyword = "") {
    return async (dispatch) => {
        try {
            console.log(keyword);
            const {data} = await axios.get(`/orders/all?status=${keyword}`);

            if(data.success === true){
                dispatch({
                    type: ALL_ORDERS_SUC,
                    payload: data.allOrders
                })
            }
            else{
                dispatch({
                    type: ALL_ORDERS_FAIL,
                    payload: data.message
                })
            }
        } catch (error) {
            dispatch({
                type: ALL_ORDERS_SUC,
                payload: error.response.data.message
            })
        }
    }
}

