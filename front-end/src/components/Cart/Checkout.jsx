import React, { Fragment } from 'react'
import Shipping from './Shipping'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import ConfirmOrder from './ConfirmOrder'
const Checkout = () => {

  const {isAuthenticated} = useSelector(state => state.user)
  const navigate = useNavigate();
  const params = useParams();
  React.useEffect(()=>{
    if(isAuthenticated === false){
        navigate("/cart");
    }
  }, [isAuthenticated])
  return (
    <Fragment>
        {params.keyword === "shipping" && <Shipping />}
        {params.keyword === "confirm" && <ConfirmOrder />}
    </Fragment>
  )
}

export default Checkout