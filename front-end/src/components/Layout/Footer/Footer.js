import React from "react";
import { Link} from 'react-router-dom';
import "./Footer.css"
const Footer = function () {
    return(
        <div className="footer">
            <div className="left-s">
                <Link className = "linkf" to = "/about">About Us</Link>
                <Link className = "linkf" to = "/contact">Contact Us</Link>
            </div>
            <div className="middle-s">
                <Link to = "/" className="logof linkf">PRODUCT ZOID</Link>
                <p>Copyrights 2021 © Dhairya</p>
            </div>
            <div className="right-s">
                <a className = "linkf" href="https://facebook.com">Facebook</a>
                <a className = "linkf" href="twitter.com">Twitter</a>
                <a className = "linkf" href="instagram.com">Instagram</a>
            </div>
        </div>
    )
}

export default Footer;