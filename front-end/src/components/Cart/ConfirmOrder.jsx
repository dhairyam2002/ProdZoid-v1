import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import "./ConfirmOrder.css"
const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector(state => state.cart);

  const { user } = useSelector(state => state.user);

  const subTotal = cartItems.reduce((acc, item) => {
    return acc + (item.price * item.quantity)
  }, 0)
  return (
    <Fragment>
      <div className='confirm-order-component'>
        <div className='co-left'>
          <div className='co-shippingInfo'>
            <h4><b>Shipping Info</b></h4>
            <p>Name: Dhairya Modi</p>
            <p>Phone: 9979211155</p>
            <p>Address: Alibaba 40 Chor</p>
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
          <button>Confirm Order!</button>
        </div>
      </div>
    </Fragment>
  )
}

export default ConfirmOrder