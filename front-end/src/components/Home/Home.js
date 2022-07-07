import React, { Fragment } from 'react'
import Product from "./Product.js"
import "./Home.css"
// import MetaData from '../Layout/MetaData.jsx'
import {getProduct} from "../../actions/productAction"
import {useSelector, useDispatch} from "react-redux"
import Loader from "../../components/Layout/Loader/Loader"
const Home = () => {
  const dispatch = useDispatch(); 

  React.useEffect(()=>{
    dispatch(getProduct())
  },[]);
  
  const {loading, error, products} = useSelector(function(state){
    return state.products;
  })

 
  return (
    <Fragment>
      {loading ? <><Loader /></> : (
         <>
         <h2 className="homeHeading">Featured</h2>
         <div className="container" id="container">
 
           {products && products.map(product => <Product product = {product} key = {product._id} />)}
 
 
         </div>
         </>
      )}
      {/* <MetaData title = {"ProductZoid"} /> */}
     
    </Fragment>
  )
}

export default Home