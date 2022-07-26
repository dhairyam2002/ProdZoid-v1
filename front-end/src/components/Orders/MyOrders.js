import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from "../Layout/Loader/Loader";
import { DataGrid } from '@mui/x-data-grid';
import { myOrders } from '../../actions/orderAction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../Cart/Cart.css";

const MyOrders = () => {

    const { loading, isAuthenticated, user } = useSelector(state => state.user);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [loader, setLoader] = React.useState(true);

    const { orders, error } = useSelector(state => state.userOrders);
    React.useEffect(() => {
        if (loading === false) {
            if (isAuthenticated === false) {
                navigate("/login");
            }
        }
        dispatch(myOrders());
    }, [loading, isAuthenticated, dispatch]);

    setTimeout(() => {
        setLoader(false);
    }, 1000)

    const rows = [];

    orders.map((item) => {
        const rowObj = {
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice,
            quantity: item.orderItems.length
        }
        rows.push(rowObj);
    })
    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            flex: 1
        },
        {
            field: "status",
            headerName: "Status",
            flex: 0.5
        },
        {
            field: "quantity",
            headerName: "Items Ordered",
            flex: 0.5
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 0.5
        },
        {
            field: "actions",
            headerName: "Actions",
            renderCell: (params) => {
                return (
                    <Link to={`/myOrders/order/${params.getValue(params.id, "id")}`}>View</Link>
                )
            }
        }
    ];

    function handleGoBack(){
        window.history.go(-1);
    }
    return (
        <Fragment>
            {loader ? <Loader /> : (

                <div className='myOrder-component'>
                    <h3>My Orders</h3>
                    <div className='back-btn od-btn mo-btn'>
                        <button onClick={handleGoBack}>
                            <div>
                                <ArrowBackIcon />Back
                            </div>
                        </button>
                    </div>
                    
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className='order-table'
                        autoHeight />

                </div>
            )}
        </Fragment>
    )
}

export default MyOrders