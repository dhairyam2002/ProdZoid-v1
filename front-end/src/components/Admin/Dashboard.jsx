import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './Sidebar';

function Dashboard() {
    const { isAuthenticated, loading, user } = useSelector(state => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (loading === false) {
            if (user.role !== "admin") {
                navigate("/");
            }
        }
    }, [isAuthenticated, loading, dispatch])
    return (
        <div>
           <Sidebar />
        </div>
    )
}
export default Dashboard;