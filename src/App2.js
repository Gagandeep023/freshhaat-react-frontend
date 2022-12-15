import React from 'react'
import { Routes, Route } from 'react-router-dom'
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


function App2() {


    return (
        <Routes>
          <Route path="/" element={<Layout />}>
    
            {/* public routes */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="linkpage" element={<LinkPage />} />
            <Route path="unauthorized" element={<Unauthorized />} />
    
            {/* we want to protect these routes */}
            <Route element={< AuthVerify />}>
              
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={ROLES.User} />}>
                <Route path="/" element={<Home />} />
              </Route>
    
              <Route element={<RequireAuth allowedRoles={ROLES.User} />}>
                <Route path="editor" element={<Editor />} />
              </Route>
    
    
              <Route element={<RequireAuth allowedRoles={ROLES.Admin} />}>
                <Route path="admin" element={<Admin />} />
              </Route>
    
              <Route element={<RequireAuth allowedRoles={ROLES.User} />}>
                <Route path="lounge" element={<Lounge />} />
              </Route>
            </Route>
            </Route>
    
            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Route>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route  path="/dashboard/home" element={<DashboardHome />} />
            <Route  path="/dashboard/post" element={<NewPost/>} />
            <Route path="/dashboard/edit/:id" element={<EditPost/>} />
            <Route path="/dashboard/post/:id" element={<PostPage/>} />
            <Route path="/dashboard/about" element={<About/>} />
            <Route path="dashboard/*" element={<Missing/>} />
          </Route>



    
        </Routes>
      );
    }
    

export default App2