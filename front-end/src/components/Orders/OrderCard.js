import React from 'react'
import { Link } from 'react-router-dom'
import '../Cart/Cart.css'


const OrderCard = ({item}) => {
    return (
        <div className='item-card'>
            <img src={item.image} alt="" />
            <div>
                <Link to={`/product/${item.pid}`}>{item.name}</Link>
                <span>Price: ₹{item.price}</span>
            </div>
        </div>
    )
}

export default OrderCard;