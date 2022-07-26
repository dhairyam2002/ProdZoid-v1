import React from "react";
import { Link } from 'react-router-dom';
import "./Footer.css"
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import Twitter from "@mui/icons-material/Twitter";
const Footer = function () {
    return (
        <div className="footer">
            <div className="left-s">
                <Link className="linkf" to="/about">About Us</Link>
                <Link className="linkf" to="/contact">Contact Us</Link>
            </div>
            <div className="middle-s">
                <Link to="/" className="logof linkf logo">ProdZoid</Link>
                <p>Copyrights 2022 © Dhairya</p>
            </div>
            <div className="right-s">
                <div>
                    <a className="linkf" href="https://github.com/dhairyam2002"><GitHubIcon className="icon" />Github</a>
                </div>
                <div>
                    <a className="linkf" href="twitter.com"><Twitter className="logo" />Twitter</a>
                </div>

            </div>
        </div>
    )
}

export default Footer;