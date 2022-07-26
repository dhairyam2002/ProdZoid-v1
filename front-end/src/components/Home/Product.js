import React from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component';
const Product = ({ product }) => {
    
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "#012133",
        size: 16,
        value: product.ratings || product.rating,
        isHalf: true
    } 
    const {id} = useParams();
    return (

        <Link className="productCard" to={`/product/${product._id}`}>
            <img src={product.images && product.images[0] ? product.images[0].url : "https://burst.shopifycdn.com/photos/photography-product-download.jpg?width=1200&format=pjpg&exif=1&iptc=1"}  />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} /> <span>({product.numOfReviews})</span>
            </div>
            <span>{"₹" + product.price}</span>
        </Link>


    )
}

export default Product