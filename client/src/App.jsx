import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react';

import ProtectedAdmin from "./admin-protected";
import Protected from "./protected";

// Buyer Components
import Home from "./components/buyer/home";
import Products from "./components/buyer/products";
import Navbar from "./components/buyer/navbar"
import Product_details from './components/buyer/product_details';
import QnA from './components/buyer/qna';
import AboutUs from './components/buyer/about-us';
import Checkout from './components/buyer/checkout';
import Footer from './components/buyer/footer';
import Bill from './components/buyer/bill';
import Profile from './components/buyer/profile';
import UserOrders from './components/buyer/userOrders';
import Login from './components/buyer/login';
import Cart from './components/buyer/cart';

// Seller Components
import Admin from "./components/admin/admin";
import AdminLogin from "./components/admin/admin-login";
import AdminSignUp from './components/admin/admin-sign-up';
import AdminSellers from './components/admin/admin-sellers';
import EditSellers from './components/admin/seller/editSeller';
import AdminInventory from './components/admin/admin-inventory';
import AdminOrders from './components/admin/admin-orders';
import AdminNFT from './components/admin/admin-nft';
import AdminProducts from './components/admin/admin-products';
import AllProducts from './components/admin/products/all-products';
import NewProductsBtn from './components/admin/products/new-products-btn';
import NewProduct from './components/admin/products/new-products';
import EditProduct from './components/admin/products/edit-product';
import AdminNavbar from './components/admin/admin-navbar';
import AllOrders from './components/admin/orders/allOrders';
import SentNFT from './components/admin/nft/sentNFT';
import AllInventory from './components/admin/inventory/all-inventory';
import EditInventory from './components/admin/inventory/edit-inventory';
import NewInventory from './components/admin/inventory/new-inventory';


function App(){
    const [token, setToken] = useState(null);
    const [adminToken, setAdminToken] = useState(null);
    
    var isLoggedIn;
    var adminIsLoggedIn;

    useEffect(() => {
        if (sessionStorage.getItem('token')) {    
            try{
                setToken(sessionStorage.getItem('token'))
            }
            catch{
                console.error("Error in setting Token")
            }
        }
        if (sessionStorage.getItem('admin-token')) {    
            try{
                setAdminToken(sessionStorage.getItem('admin-token'))
            }
            catch{
                console.error("Error in setting Admin Token")
            }
        }
      }, []);
    
    if(!token) {
        isLoggedIn = false;
        console.log("Unable to get Token:" + isLoggedIn)
    } 
    if(token) {
        isLoggedIn = true;
        console.log("Got Token:" + isLoggedIn)
    }

    if(!adminToken) {
        adminIsLoggedIn = false;
        console.log("Unable to get Admin Token:" + adminIsLoggedIn)
    }
    if(adminToken) {
        adminIsLoggedIn = true;
        console.log("Got Admin Token:" + adminIsLoggedIn)
    }

    return(
        <BrowserRouter>
            <div>  
                <Routes>
                    <Route path="/" element={<Protected isLoggedIn={isLoggedIn}><Navbar login={isLoggedIn} /><Home /><Footer /></Protected>}/>
                    <Route path="/products" element={<Protected isLoggedIn={isLoggedIn}><Navbar login={isLoggedIn} /><Products /><Footer /></Protected>} />
                    <Route path="/about-us" element={<Protected isLoggedIn={isLoggedIn}><Navbar login={isLoggedIn} /><AboutUs /><Footer /></Protected>}/>
                    <Route path="/profile" element={<Protected isLoggedIn={isLoggedIn}><Navbar login={isLoggedIn} /><Profile /><UserOrders /><Footer /></Protected>}/>
                    <Route path="/shoe/:id" element={<Protected isLoggedIn={isLoggedIn}><Navbar login={isLoggedIn} /><Product_details /><Footer /></Protected>}/>
                    <Route path="/cart" element={<><Navbar login={isLoggedIn} /><Cart /><Footer /></>}></Route>
                    <Route path="/checkout" element={<Protected isLoggedIn={isLoggedIn}><Navbar login={isLoggedIn} /><Checkout /><Footer /></Protected>}/>
                    <Route path="/bill/:id" element={<Protected isLoggedIn={isLoggedIn}><Navbar login={isLoggedIn} /><Bill /><Footer /></Protected>}/>
                    <Route path="/QnA" element={<><Navbar login={isLoggedIn} /><QnA /></>} />
                    <Route path="/login" element={<><Navbar login={isLoggedIn} /><Login/></>}></Route>
                    <Route path="/sign-up" element={<><Navbar /> <Footer /></>} />

                    <Route path='/admin' element={<ProtectedAdmin isLoggedIn={adminIsLoggedIn}><AdminNavbar /><Admin /></ProtectedAdmin>}/>
                    <Route path='/admin/manage/products' element={<ProtectedAdmin isLoggedIn={adminIsLoggedIn}><AdminNavbar login={adminIsLoggedIn} /><AdminProducts /><AllProducts /><NewProductsBtn /></ProtectedAdmin>}/>
                    <Route path='/admin/manage/products/new' element={<ProtectedAdmin isLoggedIn={adminIsLoggedIn}><AdminNavbar login={adminIsLoggedIn} /><AdminProducts /><NewProduct /></ProtectedAdmin>}/>
                    <Route path='/admin/manage/products/edit/:id' element={<ProtectedAdmin isLoggedIn={adminIsLoggedIn}><AdminNavbar login={adminIsLoggedIn} /><AdminProducts /><EditProduct /></ProtectedAdmin>}/>
                    <Route path='/admin/manage/orders' element={<ProtectedAdmin isLoggedIn={adminIsLoggedIn}><AdminNavbar login={adminIsLoggedIn} /><AdminOrders /><AllOrders /></ProtectedAdmin>}/>
                    <Route path='/admin/manage/sellers' element={<ProtectedAdmin isLoggedIn={adminIsLoggedIn}><AdminNavbar login={adminIsLoggedIn} /><AdminSellers /></ProtectedAdmin>}/>
                    <Route path='/admin/manage/sellers/edit/:id' element={<ProtectedAdmin isLoggedIn={adminIsLoggedIn}><AdminNavbar login={adminIsLoggedIn} /><EditSellers/></ProtectedAdmin>}/>
                    <Route path='/admin/manage/inventory' element={<ProtectedAdmin isLoggedIn={adminIsLoggedIn}><AdminNavbar login={adminIsLoggedIn} /><AdminInventory /><AllInventory /></ProtectedAdmin>}/>
                    <Route path='/admin/manage/inventory/edit/:id' element={<ProtectedAdmin isLoggedIn={adminIsLoggedIn}><AdminNavbar login={adminIsLoggedIn} /><AdminInventory /><EditInventory /></ProtectedAdmin>}/>
                    
                    <Route path='/admin/manage/inventory/new' element={<ProtectedAdmin isLoggedIn={adminIsLoggedIn}><AdminNavbar login={adminIsLoggedIn} /><AdminInventory /><NewInventory /></ProtectedAdmin>}/>
                    
                    <Route path='/admin/manage/nft' element={<ProtectedAdmin isLoggedIn={adminIsLoggedIn}><AdminNavbar login={adminIsLoggedIn} /><AdminNFT /><SentNFT /></ProtectedAdmin>}/>
                    <Route path="/admin/login" element={<AdminLogin />}></Route>
                    <Route path="/admin/sign" element={<AdminSignUp />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App