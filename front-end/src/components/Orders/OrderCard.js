import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'
import '../Cart/Cart.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import {ToastContainer, toast} from 'react-toastify';


const OrderCard = ({ item, status, user }) => {
    //Dialog
    const [open, setOpen] = React.useState(false);
    const [description, setDescription] = React.useState("");
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleSubmit(event) {
        event.preventDefault();
        const reviewObject = {
            productId: item.product,
            rating: value,
            comment: description
        }
        fetch(`/api/v1/product/review`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewObject),
        }).then((res) => res.json()).then((data) => {
            if(data.success === true){
                toast.success("Review added successfully!");
                setTimeout(() => {
                    handleClose();
                }, 500);
            }
        }).catch((error) => console.log(error));
    }
    function handleChange(event) {
        setDescription(event.target.value)
    }

    const [value, setValue] = React.useState(1);

    return (
        <Fragment>
            <div className='item-card'>
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
            <div className='review-dialogue'>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Update Product</DialogTitle>
                    <DialogContent>
                        <div className='po-dialogue'>
                            <Typography component="legend">Rate Product</Typography>
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                            <textarea name="description" required onChange={handleChange} placeholder='Description' rows={6} cols={50} />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button className='customized-btn' onClick={handleClose}>Close</button>
                        <button className='customized-btn' onClick={handleSubmit}>Post Product</button>
                    </DialogActions>
                </Dialog>
            </div>
                <img src={item.image} alt="" />
                <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>Price: ₹{item.price}</span>
                    {status == "delivered" && user.role != "admin" ? <button className='customized-btn' onClick={handleClickOpen}>Submit Review</button> : ""}
                </div>
            </div>
        </Fragment>

    )
}

export default OrderCard;