import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createOrder } from '../../actions/orderAction';
import "./ConfirmOrder.css"
import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useNavigate , Redirect} from 'react-router-dom';
import { removeFromCart } from '../../actions/cartAction';
const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector(state => state.cart);

  const { user } = useSelector(state => state.user);

  const subTotal = cartItems.reduce((acc, item) => {
    return acc + (item.price * item.quantity)
  }, 0)

  const { orderStatus } = useSelector(state => state.order);
  const orderItems = [];
  cartItems.map((item) => {
    const obj = {
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      product: item.pid
    }
    orderItems.push(obj);
  })
  const { _id } = user;
  const dispatch = useDispatch();
  function confirmOrder() {
    const data = {
      shippingDetails: shippingInfo,
      orderItems,
      orderValue: subTotal,
      totalPrice: subTotal + 0.18 * subTotal,
      user: _id
    }
    dispatch(createOrder(data));
  }
  const navigate = useNavigate();
  React.useEffect(() => {
    if (orderStatus.success === true) {
      toast.success("Order Placed Successfully");
      setTimeout(() => {
        cartItems.map((item) => dispatch(removeFromCart(item.pid)));
        window.location.replace("/myOrders");
        navigate("/account/me/myOrders");
      }, 1000);

    }
  }, [orderStatus]);
  return (
    <Fragment>
      <ToastContainer
        position="top-center"
        autoClose={5001}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        theme='dark'
        rtl={false}
        pauseOnFocusLoss
        draggable
        type="error"
        pauseOnHover
      />
      <div className='confirm-order-component'>
        <div className='co-left'>
          <div className='co-shippingInfo'>
            <h4><b>Shipping Info</b></h4>
            <p>Name: {user.name}</p>
            <p>Phone: {shippingInfo.phoneNo}</p>
            <p>Address: {shippingInfo.address}</p>
          </div>
          <div className='co-cart-info'>
            <h4><b>Order Items</b></h4>
            <div className='co-items'>
              {cartItems.length && cartItems.map((item) => (
                <div className='co-cart-component'>
                  <img src={item.image} />
                  <div>
                    <p>{item.name}</p>
                    <p>{item.quantity} X {item.price} = <b>{item.quantity * item.price}</b></p>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='co-right'>
          <h4><b>Order Summary</b></h4>
          <div className='co-right-sum co-0'>
            <p>Subtotal</p>
            <span>₹{subTotal}</span>
          </div>
          <div className='co-right-sum'>
            <p>Shipping Charges</p>
            <span>₹{0}</span>
          </div>
          <div className='co-right-sum'>
            <p>GST</p>
            <span>₹{subTotal * 0.18}</span>
          </div>
          <div className='co-right-sum co-0'>
            <p>Total</p>
            <span>₹{subTotal * 0.18 + subTotal}</span>
          </div>
          <button onClick={confirmOrder}>Confirm Order!</button>
        </div>
      </div>
    </Fragment>
  )
}

export default ConfirmOrder