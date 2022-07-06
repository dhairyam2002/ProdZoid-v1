import React, { Fragment } from 'react'
import Product from "./Product.js"
import "./Home.css"
// import MetaData from '../Layout/MetaData.jsx'
import {getProduct} from "../../actions/productAction"
import {useSelector, useDispatch} from "react-redux"

const Home = () => {
  const dispatch = useDispatch(); 

  React.useEffect(()=>{
    dispatch(getProduct())
  },[]);
  
  const {loading, products} = useSelector(function(state){
    return state.products;
  })
  // console.log(products);
  return (
    <Fragment>
      {/* <MetaData title = {"ProductZoid"} /> */}
        <h2 className="homeHeading">Featured</h2>
        <div className="container" id="container">

          {products && products.map(product => <Product product = {product} />)}
          {/* {products} */}


        </div>
    </Fragment>
  )
}

export default Home