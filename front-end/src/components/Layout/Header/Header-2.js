import React from "react";
import { Link } from 'react-router-dom';
import "./Header.css"


const Header = function () {
    return (
        <div className = 'header-top'>
        <div className="header">
            <Link to="/products" className="link">Products</Link>
            <Link to="/" className="link logo"> PRODUCT ZOID</Link>
            <div className="right-half">
                <Link to = "/cart" className="link cart"><span className="material-symbols-outlined">shopping_cart</span></Link>
                <Link to = "/user" className="link user"><span className="material-symbols-outlined">account_circle</span></Link>
            </div>

        </div>
        </div>
    )
}

export default Header