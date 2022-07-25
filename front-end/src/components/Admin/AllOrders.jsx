import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { getProduct } from '../../actions/productAction';
import Loader from "../Layout/Loader/Loader";
import "./AllProducts.css";
import { getAllOrders } from '../../actions/orderAction';

function AllOrders() {
    const { isAuthenticated, loading, user } = useSelector(state => state.user);

    const {allOrders} = useSelector(state => state.allOrders);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (loading === false) {
            if (user.role !== "admin") {
                navigate("/");
            }
        }
        dispatch(getAllOrders());
    }, [isAuthenticated, loading, dispatch])

    const rows = [];

    allOrders.map((item) => {
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
                    <Link to={`/admin/orders/details/${params.getValue(params.id, "id")}`}>View</Link>
                )
            }
        }
    ];
    return (
        <Fragment>
            <div className='d-sections'>
                <div className='sidebar'>
                    <Sidebar />
                </div>
                <div className='d-content' id = 'dashboardContainer'>
                     <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className='order-table'
                        autoHeight />
                </div>
            </div>

        </Fragment>
    )
}

export default AllOrders;