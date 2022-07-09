import React, { Fragment } from 'react'
import "./Products.css";

import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productAction';
import Loader from '../Layout/Loader/Loader';
import Product from '../Home/Product';
import { useNavigate, useParams } from 'react-router-dom';
import { Slider, Typography } from '@mui/material';
import { useHistory } from "react-router-dom";
// import { Typography } from '@mui/material/styles/createTypography';
const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, products } = useSelector(function (state) {
    return state.products;
  })
  let { keyword } = useParams();
  const [price, setPrice] = React.useState([0, 250000]);
  const [rating, setRating] = React.useState([0, 5]);

  function priceHandler(event, newPrice) {
    setPrice(newPrice);
  }

  function ratingHandler(event, newRating) {
    setRating(newRating);
  }
  // React.useEffect(() => {
  //   dispatch(getProduct(keyword, price))
  // }, [dispatch, keyword, price]);

  function handleFiltering(event){
    navigate(`/products/${keyword ? keyword : ""}`);
    console.log(keyword + " " + price + " "+ rating);
    dispatch(getProduct(keyword, price, rating));
  }

  return (
    <Fragment>
      {loading ? <><Loader /></> : (
        <div className='product-page'>
          <div className='filter-box'>
            <p>Price filter:</p>
            <Slider className='slider' value={price} onChange={priceHandler}
              valueLabelDisplay='auto'
              aria-labelled-by="range-slider" min={0} max={200000} />

            <p>Rating filter: </p>
            <Slider className='slider' value={rating} onChange={ratingHandler}
              valueLabelDisplay='auto'
              aria-labelled-by="range-slider" min={0} max={5} />
              <button className='apply-filter' onClick={handleFiltering}>Apply Filter</button>
          </div>
          <h2 className="homeHeading">Products</h2>
          <div className="container" id="container">

            {products && products.map(product => <Product product={product} key={product._id} />)}


          </div>
        </div>
      )}
    </Fragment>
  )
}

export default Products;