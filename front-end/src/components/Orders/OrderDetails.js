import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from "../Layout/Loader/Loader";
import { DataGrid } from '@mui/x-data-grid';
import { singleOrder } from '../../actions/orderAction';
import OrderCard from './OrderCard';
import "../Cart/Cart.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const OrderDetails = () => {
  const { loading, isAuthenticated, user } = useSelector(state => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const { orderDetails } = useSelector(state => state.orderDetails);

  const dispatch = useDispatch();
  const [loader, setLoader] = React.useState(true);

  React.useEffect(() => {
    if (loading === false) {
      if (isAuthenticated === false) {
        navigate("/login");
      }
    }

    dispatch(singleOrder(params.id));
  }, [loading, isAuthenticated, dispatch]);

  setTimeout(() => {
    setLoader(false);
  }, 1000)

  function handleGoBack(event){
    window.history.go(-1);
  }
  return (
    <Fragment >
      {loader ? <Loader /> : (
        <Fragment>
          <div className='orders-status'>

            <h5 >Status: Processing, You will get a text message, once product is out for delivery on your city!</h5>
            <p>Order Creation Date: {orderDetails.createAt.slice(0, 10)}</p>
          </div>

          <div className='back-btn'>
            <button onClick={handleGoBack}>
              <div>
                <ArrowBackIcon />Back
              </div>
            </button>
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

export default OrderDetails;