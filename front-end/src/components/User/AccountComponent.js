import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'

function AccountComponent(){
    const navigate = useNavigate();

    const {loading, isAuthenticated, user} = useSelector(state => {
        return state.user;
    })

    React.useEffect(()=>{
        if(isAuthenticated === false){
            navigate("/login");
        }
    }, [isAuthenticated])
    return(
        <div className='account-component'>
            This page won't be accessible once you log out (http://localhost:4000/api/v1/logout)
        </div>
    )
}

export default AccountComponent;