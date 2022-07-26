import React, { Fragment } from 'react'
import Carousel from "react-material-ui-carousel"
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetail } from '../../actions/detailAction';
import { useParams, useLocation } from 'react-router-dom';
import ReviewsCard from './ReviewsCard';
import Loader from '../Layout/Loader/Loader';
import { addToCart } from '../../actions/cartAction';
import { toast, ToastContainer } from 'react-toastify'



import "./ProductDetails.css"
import ReactStars from 'react-rating-stars-component';
import { gridSelectionStateSelector } from '@mui/x-data-grid';
const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const currentRoute = useLocation();
    console.log(id);
    React.useState(() => {
        dispatch(getProductDetail(id));
        const element = document.querySelector(`#${"product-details"}`)
        if(element){
            element.scrollIntoView();
        }
    }, [dispatch, id]);

    const { productDetail, loading, error } = useSelector(function (state) {
        return state.productDetail
    })
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "black",
        size: window.innerWidth < 900 ? 21 : 25,
        value: productDetail.ratings,
        isHalf: true
    }

    const obj = useSelector(state => state.cart);
    console.log(obj);
    // console.log(productDetail);

    const [quantity, setQuantity] = React.useState(1);

    function increaseQuantity(event) {
        if (quantity >= productDetail.stock) {
            return;
        }
        setQuantity(prevState => prevState + 1);
    }
    function decreaseQuantity(event) {
        setQuantity(prevState => {
            if (prevState === 1) {
                return 1;
            }
            else {
                return prevState - 1;
            }
        })
    }
    function cartHandler(event) {
        if (productDetail.stock < 1) {
            toast.error("Out of stock!");
            return;
        }
        dispatch(addToCart(id, quantity));
        toast.success("Item added to cart!");
    }


    //Dialogue

    const [open, setOpen] = React.useState(false);
    const [description, setDescription] = React.useState("");
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function handleSubmit(event) {
        event.preventDefault();
        const reviewObject = {
            productId: productDetail._id,
            rating: value,
            comment: description
        }
        fetch(`/api/v1/product/review`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewObject),
        }).then((res)=> res.json()).then((data)=> {
            console.log(data);
        }).catch((error)=> console.log(error));
    }
    function handleChange(event) {
        setDescription(event.target.value)
    }

    const [value, setValue] = React.useState(1);
    return (
        <Fragment >
            {loading ? <Loader /> : (
                <Fragment>
                    <ToastContainer
                        position="top-center"
                        autoClose={5001}
                        hideProgressBar={true}
                        newestOnTop={false}
                        closeOnClick
                        theme='dark'
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        type="error"
                        pauseOnHover
                    />
                    <div className='product-details' id="product-details">
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
                                    <button className='operator' onClick={decreaseQuantity}>-</button>
                                    <input type="number" value={quantity} />
                                    <button className='operator' onClick={increaseQuantity}>+</button>
                                </div>
                                <button className='customized-btn add-to-cart' onClick={cartHandler}>Add to cart</button>
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
                        </div>

                    </div>
                    <h3 className='reviews-heading'>Reviews</h3>
                    {productDetail.reviews && productDetail.reviews[0] ? (
                        <div className='reviews'>
                            {productDetail.reviews && productDetail.reviews.map((item) => {
                                return (
                                    <ReviewsCard reviews={item} key={item._id}></ReviewsCard>
                                )
                            })}
                        </div>
                    ) : (
                        <><p className="no-reviews"> No Reviews </p></>
                    )}
                </Fragment>
            )}
        </Fragment>

    )
}

export default ProductDetails