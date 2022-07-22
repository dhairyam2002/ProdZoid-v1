import React, { Fragment } from 'react'
import "./Cart.css";
import ItemCard from './ItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/cartAction';

const Cart = () => {

  const dispatch = useDispatch();

  const { cartItems } = useSelector(state => state.cart);

  function increaseQuantity(id, quantity, stock){
    if(quantity >= stock){
      return;
    }
    dispatch(addToCart(id, quantity + 1));
  }
  function decreaseQuantity(id, quantity, stock){
    if(quantity == 1){
      return;
    }
    dispatch(addToCart(id, quantity - 1));
  }
  function removeItemsFromCart(id){
    dispatch(removeFromCart(id));
  }
  return (
    <Fragment >
      {cartItems.length === 0 ? "No items present" : (<Fragment>
      <div className="cart-component">
        <div className="cart-header">
          <p>Product</p>
          <p>Quantity</p>
          <p>Total</p>
        </div>

        {cartItems && cartItems.map((item) => (
          <div className='card-container'>
            <ItemCard item={item} removeItems = {removeItemsFromCart}/>
            <div className='card-q'>
              <button onClick={()=>{
                return decreaseQuantity(item.pid, item.quantity, item.stock)
              }}>-</button>
              <input type="number" value={item.quantity} readOnly />
              <button onClick={()=>{
                return increaseQuantity(item.pid, item.quantity, item.stock)
              }}>+</button>
            </div>
            <div className='card-total'>
              <p>₹{item.price*item.quantity}</p>
            </div>
          </div>
        ))}



        <div className='gross-total'>
          <div></div>
          <div className='cart-gross'>
            <p>Gross Total</p>
            <p>₹{cartItems.reduce((acc, item)=>{
              return acc + (item.price * item.quantity)
            },0)}</p>
          </div>
          <div></div>
          <div className='checkout-btn'>
            <button>Checkout</button>
          </div>
        </div>
      </div>
    </Fragment>)}
    </Fragment>
    
  )
}

export default Cart