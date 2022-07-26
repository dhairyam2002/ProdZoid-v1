import React from 'react'
import "./AccountComponent.css"
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { forgotPassword } from '../../actions/userAction'

const ForgotPassword = () => {



    const [email, setEmail] = React.useState("");
    function handleChange(event){
        setEmail(event.target.value)
    }

    const {isAuthenticated, user} = useSelector(state=>{
        return state.user
    })
    const {loading, message, error} = useSelector(state => {
        return state.VerificationLink;
    })

    const dispatch = useDispatch();
    function handleSubmit (event){
        if(isAuthenticated){
            if(email === user.email){
                fetch(`/api/v1/password/forgot`, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email: email})
                }).then((res)=> res.json()).then((data) => {
                    if(data.success === true){
                        toast.success("Verification Link sent to the specified email!");
                    }
                    else{
                        toast.error(data.message);
                    }
                }).catch((error)=>{
                    alert(error);
                })
                // toast.success("Password reset link sent to your email address")
            }
            else{
                toast.warn("Your account's email, and entered email do not match! Please try again!")
            }
        }
        else{
            fetch(`/api/v1/password/forgot`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: email})
            }).then((res)=> res.json()).then((data) => {
                if(data.success === true){
                    toast.success("Verification Link sent to the specified email!");
                }
                else{
                    toast.error(data.message);
                }
            }).catch((error)=>{
                alert(error);
            })
            // toast.success("Password reset link sent to your email address")
        }
        
    }

  return (
    <div className='updatePanel'>
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
        <label htmlFor='email'>Enter your Email: </label>
        <input type='email' id='email' name='email' value={email} onChange = {handleChange}/>
        <button className='update-btn' onClick = {handleSubmit}>Send Link!</button>
    </div>
  )
}

export default ForgotPassword