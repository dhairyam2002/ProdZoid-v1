import React from "react";
import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import Home from "./components/Home/Home";
import "./App.css"
import Product from "./components/Layout/Product";


function App() {
  return (
    
    <Router>
      <div className="app">
      <Header />
      <Routes>
      <Route path = "/" element = {<Home />}></Route>
      </Routes>
      <Footer />
      </div>
    </Router>
  
  );
}

export default App;
