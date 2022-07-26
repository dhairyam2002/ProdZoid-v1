import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from "../Layout/Loader/Loader";
import { DataGrid } from '@mui/x-data-grid';
import { singleOrder } from '../../actions/orderAction';
import OrderCard from '../Orders/OrderCard';
import "../Cart/Cart.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ToastContainer, toast } from 'react-toastify';

const OrderDetailsAdmin = () => {
    const { loading, isAuthenticated, user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const params = useParams();
    const { orderDetails } = useSelector(state => state.orderDetails);

    const dispatch = useDispatch();
    const [loader, setLoader] = React.useState(true);

    React.useEffect(() => {
        if (loading === false) {
            if (user.role !== "admin") {
                navigate("/");
            }
        }

        dispatch(singleOrder(params.id));
    }, [loading, isAuthenticated, dispatch]);

    setTimeout(() => {
        setLoader(false);
    }, 150)

    function handleGoBack(event) {
        window.history.go(-1);
    }

    function handleConfirmDel(event) {
        const header = new Headers({ "Access-Control-Allow-Origin": "*" });
        fetch(`/order/${orderDetails._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((data) => {
            toast.success("Status Updated!");
            dispatch(singleOrder(params.id));
            setTimeout(() => {
                navigate(`/admin/orders/details/${orderDetails._id}`);
            }, 1000);
        }).catch((error) => console.log(error))
    }
    return (
        <Fragment >
            {loader ? <Loader /> : (
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
                    <div className='orders-status'>

                        <h5 style = {{color: orderDetails.orderStatus === "processing" ? "red" : "green"}}>Status: {orderDetails.orderStatus === "processing" ? "Processing" : "Delivered"}</h5>
                        <p>Order Creation Date: {orderDetails.createdAt}</p>
                    </div>

                    <div className='actions-btn back-btn'>
                        <button onClick={handleGoBack}>
                            <div>
                                <ArrowBackIcon />Back
                            </div>
                        </button>
                        {orderDetails.orderStatus === "processing" && <button className='confirm-delivery-btn' onClick={handleConfirmDel}>
                            <div>
                                Confirm Delivery!
                            </div>
                        </button>}
                    </div>
                    <div className="cart-component">
                        <div className="cart-header">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Total</p>
                        </div>

                        {orderDetails.orderItems && orderDetails.orderItems.map((item) => (
                            <div className='card-container'>
                                <OrderCard item={item} />
                                <div className='card-q'>
                                    <input type="number" value={item.quantity} readOnly />
                                </div>
                                <div className='card-total'>
                                    <p>₹{item.price * item.quantity}</p>
                                </div>
                            </div>
                        ))}



                        <div className='gross-total gross-order-info'>
                            <div></div>
                            <div className='order-info-shipping-details'>
                                <p>Shipping Details: </p>
                                <span>{orderDetails.shippingDetails.address}  </span>
                                <span>{orderDetails.shippingDetails.city}</span>
                                <p>{orderDetails.shippingDetails.pinCode} - SA</p>
                                <p>{orderDetails.shippingDetails.country}</p>
                            </div>

                            <div className='cart-gross gross-order'>
                                <div className='gross-wrapper'>
                                    <p>Gross Total:  </p>
                                    <p>₹{orderDetails.orderValue}</p>
                                </div>
                                <div className="gross-wrapper"><p>GST: 18%</p></div>
                                <div className="gross-wrapper">
                                    <p>Total Amount:  </p>
                                    <p>₹{orderDetails.totalPrice}</p>
                                </div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default OrderDetailsAdmin;