import React from 'react'
import ReactStars from 'react-rating-stars-component';
import Loader from "../Layout/Loader/Loader";
import { useDispatch, useSelector } from 'react-redux';

const ReviewsCard = ({ reviews }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "gold",
        size: window.innerWidth < 900 ? 21 : 25,
        value: reviews.ratings,
        isHalf: true
    }
    return (


        <div className='reviews-card'>
            <img className='reviewer-profile' src="https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png" alt="" />
            <ReactStars {...options} />
            <h3 classname='reviewer-name'>{reviews.name}</h3>
            <span className='reviewer-comment'>{reviews.comment}</span>

        </div>


    )
}

export default ReviewsCard