import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Country, State } from 'country-state-city'
import { useNavigate } from 'react-router-dom';
import "./Shipping.css"
import { shippingIn } from '../../actions/cartAction';

const Shipping = () => {

  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector(state => state.cart)
  const {isAuthenticated} = useSelector(state => state.user);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const navigate = useNavigate();

  function handleSubmit(event){
    event.preventDefault();
    if(phoneNo.length !== 10){
      alert("Enter valid phone number!");
    }
    else{
      dispatch(shippingIn({address, city, state, country, pinCode, setPinCode, phoneNo}));
      navigate("/checkout/confirm")
    }  
  }
  return (
    <Fragment>
      <div className='shipping-container'>
        <div className="shippingHeader">Shipping Details</div>
        <form className='shipping-form'>
            <input type="text" placeholder={'Address'} required value={address} onChange = {(e) => setAddress(e.target.value)}/>
            <input type="text" placeholder='City' required value={city} onChange = {(e)=> setCity(e.target.value)} />
            <input type="number" placeholder='PIN CODE' required value={pinCode} onChange = {(e)=> setPinCode(e.target.value)} />
            <input type="number" placeholder='PHONE NO' required value={phoneNo} onChange = {(e)=> setPhoneNo(e.target.value)} />
            <select required value={country} onChange = {(e) => setCountry(e.target.value)}>
              <option value="">Country</option>
              {Country && Country.getAllCountries().map((item) => (
                <option key= {item.isoCode} value = {item.isoCode}>{item.name}</option>
              ))}
            </select>

            {country && (
              <select required value={state} onChange = {(e)=> setState(e.target.value)}>
                <option value= "" >State</option>
                {State && State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value = {item.isoCode}>{item.name}</option>
                ))}
              </select>
            )}
            <button className='shipping-btn' onClick={handleSubmit}>
              Continue
            </button>
        </form>
      </div>
    </Fragment>
  )
}

export default Shipping