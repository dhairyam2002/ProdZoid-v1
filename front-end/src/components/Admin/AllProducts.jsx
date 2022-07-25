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

function AllProducts() {
    const { isAuthenticated, loading, user } = useSelector(state => state.user);

    const all_products = useSelector(state => state.products);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (loading === false) {
            if (user.role !== "admin") {
                navigate("/");
            }
        }
        dispatch(getProduct());
    }, [isAuthenticated, loading, dispatch])

    console.log(all_products);
    const rows = [];

    all_products.products.map((item) => {
        const rowObj = {
            id: item._id,
            name: item.name,
            stock: item.stock,
            price: item.price,
        }
        rows.push(rowObj);
    })
    const columns = [
        {
            field: "id",
            headerName: "Product ID",
            flex: 1
        },
        {
            field: "name",
            headerName: "Name",
            flex: 0.5
        },
        {
            field: "stock",
            headerName: "Stock",
            flex: 0.5
        },
        {
            field: "price",
            headerName: "Price",
            flex: 0.5
        },
        {
            field: "actions",
            headerName: "Actions",
            renderCell: (params) => {
                return (
                    <Link to={`/admin/products/${params.getValue(params.id, "id")}/#dashboardContainer`}>View</Link>
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
                    {all_products.loading ? <Loader /> : <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className='order-table'
                        autoHeight />}
                </div>
            </div>

        </Fragment>
    )
}

export default AllProducts;