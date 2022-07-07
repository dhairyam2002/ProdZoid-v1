import {createStore, combineReducers, applyMiddleware} from "redux";
import {productReducer} from "./reducers/productReducer"
import thunk from 'redux-thunk';

import {composeWithDevTools} from "redux-devtools-extension"
import { productDetails } from "./reducers/productDetails";

const reducer = combineReducers({
    products: productReducer,
    productDetail: productDetails
});

let initialState ={}

const middleWare = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
)

export default store;