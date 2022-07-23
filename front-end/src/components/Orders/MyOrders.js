import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from "../Layout/Loader/Loader";
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { myOrders } from '../../actions/orderAction';


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

    orders.map((item)=>{
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
    return (
        <Fragment>
            {loader ? <Loader /> : (
                <div className='myOrder-component'>
                    <h3>{user.name}'s orders: </h3>
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