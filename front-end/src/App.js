import React from "react";
import Header from "./components/Layout/Header/Header"
import Footer from "./components/Layout/Footer/Footer";
import {BrowserRouter as Router, Link, Route, Routes, Redirect} from 'react-router-dom';
import Home from "./components/Home/Home";
import "./App.css"
import Product from "./components/Layout/Product";
import ProductDetails from "./components/Product/ProductDetails";
import SearchComponent from "./components/Layout/SearchComponent";
import Products from "./components/Product/Products";
import LoginPage from "./components/Authentication/loginPage";
import SignUp from "./components/Authentication/signUpPage";
import {useSelector, useDispatch} from 'react-redux';
import { loadUser } from "./actions/userAction";
import AccountComponent from "./components/User/AccountComponent";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import Checkout from "./components/Cart/Checkout";
import MyOrders from "./components/Orders/MyOrders";
import OrderDetails from "./components/Orders/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import AllProducts from "./components/Admin/AllProducts";
import AllOrders from './components/Admin/AllOrders';
import OrderDetailsAdmin from "./components/Admin/OrderDetailsAdmin";
import UnprocessedOrders from "./components/Admin/UnprocessedOrders";
import ClosedOrders from "./components/Admin/ClosedOrders";

function App() {
  const dispatch = useDispatch();
  dispatch(loadUser());

  

  return (
    <Router>
      <div className="app">
      <Routes>
      <Route path = "/" element = {<><Header className='header-2 main-header'/><SearchComponent /><Home /></>}></Route>

      <Route path = "/product/:id" element = {<><Header className='header-2'/><ProductDetails /> </>}></Route>

      <Route path = "/products" element = {<><Header className='header-2 main-header'/><SearchComponent /><Products /></>}></Route>

      <Route path = "/products/:keyword" element = {<><Header className='header-2 main-header'/><SearchComponent /><Products /></>}></Route>

      <Route path = "/account" element = {<><Header className = 'header-2 main-header'></Header><AccountComponent  /></>} />
      
      <Route path = "/account/:keyword" element = {<><Header className = 'header-2 main-header'></Header><AccountComponent  /></>} />
      <Route path = "/login" element = {<LoginPage />} />
      <Route path = "/forgotPassword" element = {<ForgotPassword />} />
      <Route path = "/register" element = {<SignUp />} />
      <Route path = "/password/reset/:token" element = {<ResetPassword />}/>
      <Route path = "/cart" element = {<><Header className='header-2 main-header'/><Cart></Cart></>}/>
      <Route path = "/checkout/:keyword" element = {<><Header className='header-2 main-header'/><Checkout /></>} />

      <Route path = "/myOrders"  element = {<><Header className='header-2 main-header'/><MyOrders /></>}/>

      <Route path = "/myOrders/order/:id" element = {<><Header className='header-2 main-header'/><OrderDetails /></>}/>

      <Route path = "/admin/dashboard" element = {<><Header className='header-2 main-header'/><Dashboard /></>} />

      <Route path = "/admin/products/all" element = {<><Header className = 'header-2 main-header'/><AllProducts /></>} />

      <Route path = "/admin/orders/all" element = {<><Header className = 'header-2 main-header'/><AllOrders /></>}/>

      <Route path = "/admin/orders/pending" element = {<><Header className = 'header-2 main-header'/><UnprocessedOrders /></>}/>

      <Route path = "/admin/orders/details/:id" element = {<><Header className = 'header-2 main-header'/><OrderDetailsAdmin /></>} />

      <Route path = "/admin/orders/closed" element = {<><Header className = 'header-2 main-header'/> <ClosedOrders /> </>} />
      </Routes>
      <Footer />
      </div>
    </Router>
  
  );
}

export default App;
