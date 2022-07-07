import React from "react";
import Header from "./components/Layout/Header/Header"
import Footer from "./components/Layout/Footer/Footer";
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import Home from "./components/Home/Home";
import "./App.css"
import Product from "./components/Layout/Product";
import ProductDetails from "./components/Product/ProductDetails";



function App() {
  return (
    
    <Router>
      <div className="app">
      
      <Routes>
      <Route path = "/" element = {<><Header className='header-2'/> <Home /></>}></Route>
      <Route path = "/product/:id" element = {<><Header className='header-2'/><ProductDetails /> </>} />
      </Routes>
      <Footer />
      </div>
    </Router>
  
  );
}

export default App;
