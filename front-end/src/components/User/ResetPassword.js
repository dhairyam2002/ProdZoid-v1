import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { resetPassword } from '../../actions/userAction'
import { useDispatch } from 'react-redux'
const ResetPassword = () => {

  const [passwords, setPasswords] = React.useState({
    newPassword: "",
    confirmPassword: ""
  })

  function handleChange(event) {
    setPasswords(prevState => {
      return {
        ...prevState,
        [event.target.name]: event.target.value
      }
    })
  }
  const params = useParams();
  const dispatch = useDispatch();

  function handleSubmit(event) {
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.warn("Passwords dont't match!");
    }
    else {
      fetch(`/api/v1/password/reset/${params.token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({password: passwords.newPassword, confirmPassword: passwords.confirmPassword})
      }).then((res) => res.json()).then((data) => {
        if (data.success === true) {
          toast.success("Password Successfully Updated!");
          setTimeout(() => {
            window.location.replace("/account");
          }, 800);
        }
        else {
          toast.error(data.message);
        }
      }).catch((error) => {
        alert(error);
      })
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
      <label htmlFor="newPassword">New Password:</label>
      <input type='password' name="newPassword" value={passwords.newPassword} onChange={handleChange} />
      <label htmlFor="confirmPassword">Update Password: </label>
      <input type='password' name="confirmPassword" value={passwords.confirmPassword} onChange={handleChange} />
      <button className='update-btn' onClick={handleSubmit}>Update Password</button>
    </div>
  )
}

export default ResetPassword