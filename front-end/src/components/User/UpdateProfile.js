import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom'
import { loadUser, updateUserDetails } from '../../actions/userAction';
import "./AccountComponent.css"
import {ToastContainer, toast} from 'react-toastify';


function UpdateProfile(){

    const {loading, isAuthenticated, user} = useSelector(state => {
        return state.user;
    })
    const [userDetail, setUserDetail] = React.useState({
        name: user.name,
        email: user.email
    }) 

    function handleChange (event){
        setUserDetail(prevState => {
            return {
                ...prevState,
                [event.target.name] : event.target.value
            }
        })
    }
    const dispatch = useDispatch();
    function handleSubmit (event){
        if(userDetail.name == "" || userDetail.email == ""){
            toast.warn("Empty fields not allowed!!")
        }
        else{
            dispatch(updateUserDetails(userDetail));
            // dispatch(loadUser());
        }
    }
    // console.log(userDetail);
    return (
        <div className='updateProfile updatePanel'>
            <ToastContainer
                position="top-center"
                autoClose={5001}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                theme='dark'
                rtl={false}
                pauseOnFocusLoss
                draggable
                type="error"
                pauseOnHover
            />
            <p>Details:</p>
            <label htmlFor="name"><b>Name:</b></label>
            <input type="text" name='name' id='name' value={userDetail.name} onChange = {handleChange} placeholder = "Name"/>
            <label htmlFor="email"><b>Email:</b></label>
            <input type="email" name="email" id="email" value={userDetail.email} onChange = {handleChange} placeholder = "Email" />
            <button className='update-btn' onClick = {handleSubmit}>Update Profile</button>
        </div>
    )
}

export default UpdateProfile;