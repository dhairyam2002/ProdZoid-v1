import React, { Fragment } from 'react'
import Product from "./Product.js"
import "./Home.css"

const product = {
  name : "iPhone",
  images: [{url : "https://cdn.pocket-lint.com/r/s/970x/assets/images/158444-phones-review-apple-iphone-13-review-images-image1-clh15n2ocg.jpg"}],
  price: 10000,
  _id: 123
}
const Home = () => {
  return (
    <Fragment>
        <h2 className="homeHeading">Featured</h2>
        <div className="container" id="container">
          <Product product = {product} />
          <Product product = {product} />
          <Product product = {product} />
          <Product product = {product} />
          <Product product = {product} />
          <Product product = {product} />
          <Product product = {product} />
          <Product product = {product} />

        </div>
    </Fragment>
  )
}

export default Home