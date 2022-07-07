import React from 'react'
import ReactStars from 'react-rating-stars-component';
import Loader from "../Layout/Loader/Loader";
import { useDispatch, useSelector } from 'react-redux';

const ReviewsCard = ({ reviews }) => {
    console.log(reviews);
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "gold",
        size: window.innerWidth < 900 ? 21 : 25,
        value: reviews.ratings,
        isHalf: true
    }
    console.log("rendered");
    return (


        <div className='reviews-card'>
            <img className='reviewer-profile' src="https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png" alt="" />
            <ReactStars {...options} />
            <h3 classname='reviewer-name'>{reviews.name}</h3>
            <span className='reviewer-comment'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod repellat consequatur eum inventore iure, hic nam, ipsum esse ea error suscipit veritatis non ipsam mollitia, debitis a laboriosam sed eveniet modi tempora? Eos, dolorem reiciendis assumenda repellendus nam illo fugit ea. Rem minus quasi magnam, distinctio quod eum dignissimos eligendi vitae repellendus, explicabo deleniti ipsa? Eius illum eveniet suscipit doloremque soluta autem beatae. Aspernatur voluptate qui quia dolore ullam ducimus exercitationem maxime a, iure atque illo, expedita obcaecati, temporibus asperiores.</span>

        </div>


    )
}

export default ReviewsCard