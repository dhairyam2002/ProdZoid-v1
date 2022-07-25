import React , {Fragment} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./Sidebar.css"
const Sidebar = () => {
    return (
        <Fragment>
            <div className='side-bar'>
                <div className='sidebar-wrapper'><Link to = "/admin/products/all" className='sidebar-links'><span className='side-bar-links'>All Products</span></Link><ArrowForwardIosIcon /></div>
                <div className='sidebar-wrapper'><Link to = "/admin/products/create" className='sidebar-links'><span className='side-bar-links'>Post Products</span></Link><ArrowForwardIosIcon /></div>
                <div className='sidebar-wrapper'><Link to = "/admin/orders/all" className='sidebar-links'><span className='side-bar-links'>All Orders</span></Link><ArrowForwardIosIcon /></div>
                <div className='sidebar-wrapper'><Link to = "/admin/orders/processing" className='sidebar-links'><span className='side-bar-links'>Unprocessed Orders</span></Link><ArrowForwardIosIcon /></div>
                
                <div className='sidebar-wrapper'><Link to = "/admin/orders/delivered" className='sidebar-links'><span className='side-bar-links'>Closed Orders</span></Link><ArrowForwardIosIcon /></div>
                
            </div>
        </Fragment>
    )
}

export default Sidebar