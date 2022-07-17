import React from 'react'
import "../../App.css";
import { Link } from 'react-router-dom';
import {useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productAction';

const SearchComponent = () => {

    const [keyword, setKeyword] = React.useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function handleChange(event){
        setKeyword(event.target.value);

    }
    
    function handleSubmit(event) {
        event.preventDefault();
        navigate(`/products/${keyword}`)
        dispatch(getProduct(keyword));
        
       
    }
    const currentRoute = useLocation();
    
    // console.log(currentRoute);
    return (
        <div className='search-component'>
            <div className='search-form'>
                <input className='search-input' type="text" placeholder='Search Keyword Here' onChange={handleChange}/>
                <button className='search-button' onClick={handleSubmit}> Search</button>
                {/* <Link to='/products'>Search</Link> */}
            </div>
        </div>
    )
}

export default SearchComponent;