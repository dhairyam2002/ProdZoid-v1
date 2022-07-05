import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component';

const Product = ({ product }) => {

    console.log(product.id);
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "#012133",
        size: 16,
        value: 2.7,
        isHalf: true
    } 
    return (

        <Link className="productCard" to={product._id}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} /> <span>(200 Reviews)</span>
            </div>
            <span>{product.price}</span>
        </Link>


    )
}

export default Product