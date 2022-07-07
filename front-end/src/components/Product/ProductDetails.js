import React, { Fragment } from 'react'
import Carousel from "react-material-ui-carousel"
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetail } from '../../actions/detailAction';
import { useParams } from 'react-router-dom';
import ReviewsCard from './ReviewsCard';
import Loader from '../Layout/Loader/Loader';

import "./ProductDetails.css"
import ReactStars from 'react-rating-stars-component';
const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    React.useState(() => {
        dispatch(getProductDetail(id));
    }, [dispatch, id]);

    const { productDetail, loading, error } = useSelector(function (state) {
        return state.productDetail
    })
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "black",
        size: window.innerWidth < 900 ? 21: 25,
        value: productDetail.ratings,
        isHalf: true
    }

    console.log(productDetail);
    return (
        <Fragment >
            {loading ? <Loader /> : (
                <Fragment>
                <div className='product-details'>
                    <div className='first-div-child'>
                        <Carousel className='product-image'>
                            {productDetail.images && productDetail.images.map((imgItem) => {
                                return (
                                    <img className='CarouselImage' src={imgItem.url} key={imgItem.url} />
                                )
                            })}
                        </Carousel>
                    </div>
                    <div >
                        <div className='details-1'>
                            <h3>{productDetail.name}</h3>
                            <p>Product #{productDetail._id}</p>
                        </div>
                        <div className='details-2'>
                            <ReactStars {...options} />
                            <span>{productDetail.numOfReviews} Reviews</span>
                        </div>
                        <div className="details-3">
                            <h3>₹{productDetail.price}</h3>
                            <div className="details-3-1">
                                <button className='operator'>-</button>
                                <input type="number" value="100" onChange={()=>{}}/>
                                <button className='operator'>+</button>
                            </div>
                            <button className='customized-btn add-to-cart'>Add to cart</button>
                        </div>
                        <p className='status'>Status:
                            <b className={productDetail.stock < 1 ? "red" : "green"}>
                                {productDetail.stock < 1 ? "Out of stock" : "In stock"}
                            </b>
                        </p>
                        <div className="details-4">
                            <p>Description: </p>
                            <p>{productDetail.description}</p>
                        </div>
                        <div className='details-5'>
                            <button className='customized-btn'>Submit Review</button>
                        </div>
    
                    </div>
    
                </div>
                <h3 className='reviews-heading'>Reviews</h3>
                {productDetail.reviews && productDetail.reviews[0] ? (
                    <div className='reviews'>
                        {productDetail.reviews && productDetail.reviews.map((item)=>{
                            return (
                                <ReviewsCard reviews = {item} key = {item._id}></ReviewsCard>
                            )
                        })}
                    </div>
                ): (
                <><p className="no-reviews"> No Reviews </p></>
                )}
            </Fragment>
            )}
        </Fragment>
        
    )
}

export default ProductDetails