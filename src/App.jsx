import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/pages/home';
import Layout from './components/layout/layout';
import Store from './components/pages/store';
import Register from './components/pages/register';
import Login from './components/pages/login';
import Cart from './components/pages/cart';
import Checkout from './components/pages/checkout';
import ResetPassword from './components/pages/resetpassword';
import AdminLayout from './components/layout/adminLayout';
import Dashboard from './components/pages/admin/dashboard';
import Users from './components/pages/admin/users';
import Orders from './components/pages/admin/order';
import CreateProduct from './components/pages/admin/createproduct';
import AdminLogin from './components/pages/admin/adminLogin';
import AdminRoute from './components/pages/admin/adminrouteprotect';
import LogoutButton from './components/pages/admin/logoutadmin';
import   AdminProductsTable from './components/pages/admin/adminProdTable'

import NotFound from './components/404';


// In your main index.js or App.js
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3000'; // Update with your backend URL
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="store" element={<Store />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="password/reset" element={<ResetPassword />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
 {/* Admin Routes */}
 <Route path="/admin">
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<AdminLogin />} />
          <Route path="logout" element={<LogoutButton />} />
          
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<Users />} />

              <Route path="orders" element={<Orders />} />
              
              <Route path="products" element={<AdminProductsTable />} />
              


              <Route path="orders" element={<Orders />} />
              <Route path="products/createproduct" element={<CreateProduct />} />


           
            </Route>
          </Route>
        </Route>

        {/* Error Handling */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}                    
                      
  

export default App;