import React from 'react'
import "../../App.css";
import { Link } from 'react-router-dom';
import {useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productAction';

const SearchComponent = ({history}) => {
    const navigate = useNavigate();
    // console.log(navigate);
    const [keyword, setKeyword] = React.useState("");
    const dispatch = useDispatch();
    function handleChange(event){
        setKeyword(event.target.value);
        
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        dispatch(getProduct(keyword));
        
       
    }
    const currentRoute = useLocation();
    
    // console.log(currentRoute);
    return (
        <div className='search-component'>
            <div className='search-form'>
                <input className='search-input' type="text" placeholder='Search Keyword Here' onChange={handleChange}/>
                <button className='search-button' onClick={handleSubmit}><Link to='/products' className='link'>Search</Link></button>
                {/* <Link to='/products'>Search</Link> */}
            </div>

            {currentRoute.pathname == '/' ? (<Link to='/products' className='explore'>Explore more products!!</Link>) : ("")}
        </div>
    )
}

export default SearchComponent;