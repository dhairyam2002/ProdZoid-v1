
import { ADD_TO_CART } from "../constants/cartConstant";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            console.log("reducer called");
            const item = action.payload;

            const itemPresent = state.cartItems.find((it) => it.pid === item.pid)
            if (itemPresent) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((it) => it.pid === itemPresent.pid ? item : it)
                }
            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }

        default:
            return state;
    }
}