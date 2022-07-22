import React from 'react'
import {Link} from 'react-router-dom'
import "./Cart.css";

const ItemCard = ({item, removeItems}) => {
  return (
    <div className='item-card'>
      <img src={item.image} alt="" />
      <div>
        <Link to = {`/product/${item.pid}`}>{item.name}</Link>
        <span>Price: ₹{item.price}</span>
        <p onClick={()=> removeItems(item.pid)}>Remove</p>
      </div>
    </div>
  )
}

export default ItemCard