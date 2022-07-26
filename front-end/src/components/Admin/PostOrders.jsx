import React, { Fragment } from 'react';
import Sidebar from './Sidebar';
import "./PostOrders.css";
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../../actions/productAction';
import Loader from '../Layout/Loader/Loader';
function PostOrders() {

    const [postState, setPostState] = React.useState({
        name: "",
        price: "",
        category: "",
        stock: 0,
        link1: "",
        link2: "",
        link3: "",
        description: ""
    })
    const { loading, isAuthenticated, user } = useSelector(state => state.user);
    const [loader, setLoader] = React.useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    React.useEffect(()=>{
        if(loading === false){
            if (user.role !== "admin") {
                navigate("/");
            }
        }
    }, [loading, isAuthenticated, dispatch]);

    setTimeout(() => {
        setLoader(false);
    }, 700)

    function handleChange(event) {
        setPostState(prevState => (
            {
                ...prevState,
                [event.target.name]: event.target.value
            }
        ))
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetch(`/api/v1/admin/product/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(postState)
        }).then((res) => res.json()).then((data) => {
            if (data.success) {
                toast.success("Product added!")
                setTimeout(() => {
                    dispatch(getProduct());
                    navigate("/admin/products/all");
                }, 1000);
            }
            else{
                toast.error("There was some error!");
            }
        }).catch((error) => {
            toast.warn("There was some error!");
        })
    }
    return (
        <Fragment >
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
            {loader ? <Loader /> : (
            <div className='post-order-component'>
                <Sidebar />
                <div className='po-section'>
                    <input type="text" required name="name" id="" placeholder='Item Name' onChange={handleChange} />
                    <input type="number" required name="price" id="" placeholder='Item Price' onChange={handleChange} />
                    <input type="text" required name="category" id="" placeholder='Item Category' onChange={handleChange} />
                    <input type="number" required name="stock" id="" placeholder='Stock' onChange={handleChange} />
                    <input type="url" required name="link1" id="" placeholder='Image-Link-1' onChange={handleChange} />
                    <input type="url" required name="link2" id="" placeholder='Image-Link-2' onChange={handleChange} />
                    <input type="url" name="link3" id="" placeholder='Image-Link-3' onChange={handleChange} />
                    <textarea name="description" placeholder='Description' rows={5} cols={10} onChange={handleChange}></textarea>
                    <button onClick={handleSubmit}>Post Product</button>
                </div>
            </div>)}

        </Fragment>

    )
}

export default PostOrders;