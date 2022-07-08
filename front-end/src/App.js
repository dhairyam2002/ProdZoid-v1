import React from "react";
import Header from "./components/Layout/Header/Header"
import Footer from "./components/Layout/Footer/Footer";
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import Home from "./components/Home/Home";
import "./App.css"
import Product from "./components/Layout/Product";
import ProductDetails from "./components/Product/ProductDetails";
import SearchComponent from "./components/Layout/SearchComponent";
import Products from "./components/Product/Products";


function App() {
  return (
    
    <Router>
      <div className="app">
      
      <Routes>
      <Route path = "/" element = {<><Header className='header-2 main-header'/><SearchComponent /><Home /></>}></Route>
      <Route path = "/product/:id" element = {<><Header className='header-2'/><ProductDetails /> </>}></Route>
      <Route path = "/products" element = {<><Header className='header-2 main-header'/><SearchComponent /><Products /></>}></Route>
      <Route path = "/products/:keyword" element = {<><Header className='header-2 main-header'/><SearchComponent /><Products /></>}></Route>
      </Routes>
      <Footer />
      </div>
    </Router>
  
  );
}

export default App;
