import React , {Fragment} from 'react'
import { Link, useNavigate , useParams} from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./Sidebar.css"

const Sidebar = () => {
    const params = useParams();
    return (
        <Fragment>
            <div className='side-bar'>
                <Link to = "/admin/products/all"><div style ={{fontWeight: window.location.pathname === "/admin/products/all" ? 600: 400}}className='sidebar-wrapper'><Link to = "/admin/products/all" className='sidebar-links'><span className='side-bar-links'>All Products</span></Link><ArrowForwardIosIcon className='arrow-icon'/></div></Link>
                <Link to = "/admin/products/post"><div style ={{fontWeight: window.location.pathname === "/admin/products/post" ? 600: 400}} className='sidebar-wrapper'><Link to = "/admin/products/post" className='sidebar-links'><span className='side-bar-links'>Post Products</span></Link><ArrowForwardIosIcon className='arrow-icon'/></div></Link>
                <Link to = "/admin/orders/all"><div style ={{fontWeight: window.location.pathname === "/admin/orders/all" ? 600: 400}} className='sidebar-wrapper'><Link to = "/admin/orders/all" className='sidebar-links'><span className='side-bar-links'>All Orders</span></Link><ArrowForwardIosIcon className='arrow-icon'/></div></Link>
                <Link to = "/admin/orders/pending"><div style ={{fontWeight: window.location.pathname === "/admin/orders/pending" ? 600: 400}} className='sidebar-wrapper'><Link to = "/admin/orders/pending" className='sidebar-links'><span className='side-bar-links'>Pending Orders</span></Link><ArrowForwardIosIcon className='arrow-icon'/></div></Link>
                <Link to = "/admin/orders/closed"><div style ={{fontWeight: window.location.pathname === "/admin/orders/closed" ? 600: 400}} className='sidebar-wrapper'><Link to = "/admin/orders/closed" className='sidebar-links'><span className='side-bar-links'>Closed Orders</span></Link><ArrowForwardIosIcon className='arrow-icon' /></div></Link>
                
            </div>
        </Fragment>
    )
}

export default Sidebar