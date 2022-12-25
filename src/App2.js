import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import ROLES from './hooks/roles';
import AuthVerify from './hooks/AuthVerify';
import DashboardHome from './Dashboard/DashboardHome';
import './Dashboard/dashboard.css';
import NewPost from './Dashboard/NewPost';
import PostPage from './Dashboard/PostPage';
import EditPost from './Dashboard/EditPost';
import About from './Dashboard/About';
import DashboardLayout from './components/DashboardLayout';
import AuthNavigate from './hooks/AuthNavigate';
import QrCodeLinkage from './Dashboard/QrCodeLinkage';
import ProductInfomation from './Dashboard/ProductInfomation';
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>

function App2() {
  const location = useLocation();


    return (
        <Routes>
          <Route path="/" element={<Layout />}>
          
            {/* public routes */}
            <Route element={< AuthNavigate />}>
              <Route path="login" element={<Login />} />
              <Route path="unauthorized" element={<Unauthorized />} />
            </Route>

            {/* we want to protect these routes */}
            <Route element={< AuthVerify />}>
              
              <Route element={<PersistLogin />}>

                <Route element={<RequireAuth allowedRoles={ROLES.User} />}>
                  <Route path="/" element={<Navigate to="/dashboard/home" state={{ from: location }} replace />} />
                  <Route path="*" element={<Missing />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={ROLES.Admin} />}>
                  <Route path="register" element={<Register />} />
                </Route>

              </Route>

            </Route>
          </Route>

          <Route element={< AuthVerify />}>
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={ROLES.User} />}>
                <Route path="/dashboard" element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Navigate to="/dashboard/home" state={{ from: location }} replace />} />
                <Route  path="/dashboard/home" element={<DashboardHome />} />
                  <Route  path="/dashboard/post" element={<NewPost/>} />
                  <Route path="/dashboard/edit/:id" element={<EditPost/>} />
                  <Route path="/dashboard/QrCodeLinkage" element={<QrCodeLinkage/>} />
                  <Route path="dashboard/*" element={<Missing/>} />
                </Route>   
                <Route path="/dashboard/product-details" element={<PostPage/>} /> 
                <Route path="/dashboard/product-information" element={<ProductInfomation/>} /> 

              </Route>
            </Route>
          </Route>
    
        </Routes>
      );
    }
    

export default App2