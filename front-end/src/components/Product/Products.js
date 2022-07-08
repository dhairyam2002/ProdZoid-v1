import React, { Fragment } from 'react'
import "./Products.css";

import {useDispatch, useSelector} from 'react-redux';
import {getProduct} from '../../actions/productAction';
import Loader from '../Layout/Loader/Loader';
import Product from '../Home/Product';
import { useNavigate, useParams } from 'react-router-dom';
const Products = () => {
    
    const {loading, error, products} = useSelector(function(state){
        return state.products;
    })
    // console.log(products)
  return (
    <Fragment>
      {loading ? <><Loader /></> : (
         <>
         <h2 className="homeHeading">Products</h2>
         <div className="container" id="container">
 
           {products && products.map(product => <Product product = {product} key = {product._id} />)}
 
 
         </div>
         </>
      )}
    </Fragment>
  )
}

export default Products;