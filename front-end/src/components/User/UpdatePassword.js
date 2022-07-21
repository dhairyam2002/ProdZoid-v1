import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { updatePassword } from '../../actions/userAction';
import "./AccountComponent.css"
const UpdatePassword = () => {


  const [passwords, setPasswords] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const dispatch = useDispatch();
  function handleChange(event) {
    setPasswords(prevState => {
      return {
        ...prevState,
        [event.target.name]: event.target.value
      }
    })
  }
  const {loading, isUpdated, error} = useSelector(state => {
    return state.isUpdated;
  })

  function handleSubmit(event) {
    event.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Passwords don't match!! Please try again!")
    }

    else {
      dispatch(updatePassword(passwords));
    }
  }
  React.useEffect(()=>{
    if(error){
      toast.warn(error);
    }
    if(isUpdated){
      toast.success(isUpdated);
    }
  }, [isUpdated, error])
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
      <label htmlFor="oldPassword">Old Password:</label>
      <input type='password' name='oldPassword' value={passwords.oldPassword} onChange={handleChange} />
      <label htmlFor="newPassword">New Password:</label>
      <input type='password' name="newPassword" value={passwords.newPassword} onChange={handleChange} />
      <label htmlFor="confirmPassword">Update Password: </label>
      <input type='password' name="confirmPassword" value={passwords.confirmPassword} onChange={handleChange} />
      <button className='update-btn' onClick={handleSubmit}>Update Password</button>
    </div>
  )
}

export default UpdatePassword