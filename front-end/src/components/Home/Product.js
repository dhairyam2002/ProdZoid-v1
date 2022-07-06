import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component';

const Product = ({ product }) => {

    console.log(product);
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "#012133",
        size: 16,
        value: product.ratings || product.rating,
        isHalf: true
    } 
    return (

        <Link className="productCard" to={`${product._id}`}>
            <img src={"https://media.wired.com/photos/5d803f5dc891950008ce3447/master/pass/iphone-11_6175-Edit.jpg"}  />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} /> <span>({product.numOfReviews})</span>
            </div>
            <span>{"₹" + product.price}</span>
        </Link>


    )
}

export default Product