import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getProductDetail } from '../../actions/detailAction';
import Loader from "../Layout/Loader/Loader";
import "./ProductActions.css";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {ToastContainer, toast} from 'react-toastify';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ProductActions() {

    const dispatch = useDispatch();
    const { productDetail, loading: productLoader } = useSelector(state => state.productDetail);
    const { isAuthenticated, user, loading } = useSelector(state => state.user);
    const [loader, setLoader] = React.useState(true);
    const navigate = useNavigate();
    const params = useParams();
    React.useEffect(() => {
        if (loading === false) {
            if (user.role !== "admin") {
                navigate("/");
            }
        }
        dispatch(getProductDetail(params.id));
    }, [loading, isAuthenticated, dispatch]);

    const [open, setOpen] = React.useState(false);

    const [stock, setStockState] = React.useState(productDetail.stock);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    setTimeout(() => {
        setLoader(false);
    }, 300);

    function handleSubmit(event) {
        event.preventDefault();
        console.log(stock);
        fetch(`/api/v1/admin/product/${productDetail._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({stock: stock})
        }).then((res)=> res.json()).then((data)=>{
            if(data.success === true){
                toast.success("Stock updated successfully!");
                setOpen(false);
                setTimeout(() => {
                    dispatch(getProductDetail(productDetail._id))
                }, 1000);
            }

        }).catch((error) => {
            alert(error);
        })
    }
    function handleChange(event) {
        setStockState(event.target.value);
    }
    function handleDelete(event){
        event.preventDefault();
        fetch(`/api/v1/admin/product/${productDetail._id}`, {
            method: 'DELETE'
        }).then((res)=> res.json()).then((data)=>{
            if(data.success === true){
                toast.success("Successfully Deleted!");
                setTimeout(() => {
                    window.history.go(-1);
                }, 600);
            }
        }).catch((error) => alert(error));
    }
    function handleBack(){
        window.history.go(-1);
    }
    return (
        <Fragment>
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
            {productLoader ? <Loader /> : <Fragment>
                {loader ? <Loader /> : <>
                <button className='pa-btn' onClick={handleBack}><ArrowBackIcon />Back</button>
                <div className='pa-section'>
                    <div className='pa-img'>
                        <img src={productDetail.images[0].url} className='pa-image' />
                    </div>
                    <div className='pa-desc'>
                        <span>{productDetail.name}</span>
                        <p>Description: </p>
                        <div>

                            <span>{productDetail.description}</span>
                        </div>
                        <div className='pa-actions'>
                            <button onClick={handleClickOpen}>Update Stock</button>
                            <button onClick={handleDelete}>Delete Product</button>
                        </div>
                        <div className='pa-details'>
                            <span>Stock: {productDetail.stock}</span>
                            <span>Price: ₹{productDetail.price}</span>
                        </div>
                    </div>
                </div>
                    <div>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Update Product</DialogTitle>
                            <DialogContent>
                                <div className='po-dialogue'>
                                    <input type="number" required name="stock" id="" value={stock} placeholder='Stock' onChange={handleChange} />

                                </div>
                            </DialogContent>
                            <DialogActions>
                                <button onClick={handleSubmit}>Post Product</button>
                            </DialogActions>
                        </Dialog>
                    </div></>}
            </Fragment>}
        </Fragment>

    )
}
export default ProductActions;