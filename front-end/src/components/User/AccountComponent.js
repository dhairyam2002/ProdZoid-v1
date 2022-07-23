import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import "./AccountComponent.css"
import UpdateProfile from './UpdateProfile';
import Loader from "../Layout/Loader/Loader"
import UpdatePassword from './UpdatePassword';
import { logOutUser } from '../../actions/userAction';
import ForgotPassword from './ForgotPassword';

function AccountComponent() {

    // setTimeout(function () {
    //     let viewheight = window.height();
    //     let viewwidth = window.width();
    //     let viewport = document.querySelector("meta[name=viewport]");
    //     viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0");
    // }, 300);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { loading, isAuthenticated, user } = useSelector(state => {
        return state.user;
    })

    /*
    Profile
    Update profile
    Update Password
    Reset Password
    My orders
    Logout
    */
    const date = new Date(Date.now());
    const newDate = date[Symbol.toPrimitive]('string');


    function toggleState(event) {
        navigate(`/account/${event.target.id}`)
    }
    React.useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
        
    }, [isAuthenticated, loading])

    function logout(){
        dispatch(logOutUser());
    }
    return (
        <div className='account-component'>
            {loading && <Loader />}
            {!loading && isAuthenticated && <>
                <div className="left-panel" id='profile'>
                    <div className='profile-badge'>
                        <img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/profile-pic-male_4811a1.svg" alt="" />
                        <h5><b>{`Hello ${user.name}!`}</b></h5>
                    </div>
                    <p className='panel-items' id="updateProfile" onClick={toggleState}>Update Profile</p>
                   {params.keyword === "updateProfile" ? <div className='responsive-main-content'><UpdateProfile /></div>: ""}
                    <p className='panel-items' id="updatePassword" onClick={toggleState}>Update Password</p>
                    {params.keyword === "updatePassword" ? <div className='responsive-main-content'><UpdatePassword /></div> : ""}
                    <p className='panel-items' id="resetPassword" onClick={toggleState}>Reset Password</p>
                    {params.keyword === "resetPassword" ? <div className='responsive-main-content'> <ForgotPassword /></div> : ""}
                    <p className='panel-items' id='myOrders' onClick={()=> {navigate("/myOrders")}}>My Orders</p>
                    <p className='panel-items' id="logout" onClick={logout}>Logut</p>
                </div>
                <div className="main-content">
                    {params.keyword === undefined ? <div className='profile-content'>
                        <img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/profile-pic-male_4811a1.svg" alt="" />
                        <p>Name: {`${user.name}`}</p>
                        <p>Email: {`${user.email}`}</p>
                        <p>Account Created at: {"11/08/2003"}</p>
                    </div> : ""}
                    {params.keyword === "updateProfile" ? <UpdateProfile /> : ""}
                    {params.keyword === "updatePassword" ? <UpdatePassword /> : ""}
                    {params.keyword === "resetPassword" ? <ForgotPassword /> : ""}
                </div>
            </>}

        </div>
    )
}

export default AccountComponent;