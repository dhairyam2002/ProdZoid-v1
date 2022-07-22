import { createStore, combineReducers, applyMiddleware } from "redux";
import { productReducer } from "./reducers/productReducer"
import thunk from 'redux-thunk';

import { composeWithDevTools } from "redux-devtools-extension"
import { productDetails } from "./reducers/productDetails";
import { forgotPasswordReducer, resetPasswordReducer, updatePasswordReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
    products: productReducer,
    productDetail: productDetails,
    user: userReducer,
    isUpdated: updatePasswordReducer,
    VerificationLink: forgotPasswordReducer,
    resetPasswordMessage: resetPasswordReducer,
    cart: cartReducer
});

let initialState = {
    cart:{
        cartItems : localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {}
    }
}

const middleWare = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
)

export default store;