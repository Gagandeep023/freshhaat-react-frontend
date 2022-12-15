import Register from '../components/Register';
import Login from '../components/Login';
import Home from '../components/Home';
import Layout from '../components/Layout';
import Editor from '../components/Editor';
import Admin from '../components/Admin';
import Missing from '../components/Missing';
import Unauthorized from '../components/Unauthorized';
import Lounge from '../components/Lounge';
import LinkPage from '../components/LinkPage';
import RequireAuth from '../components/RequireAuth';
import PersistLogin from '../components/PersistLogin';
import { Routes, Route } from 'react-router-dom';
import ROLES from '../hooks/roles';
import AuthVerify from '../hooks/AuthVerify';
import HomeDashboard from '../Dashboard/DashboardHome';
import React from 'react'


// const ROLES = {
//   'User': 2001,
//   'Editor': 1984,
//   'Admin': 5150
// }

class LoginLayout extends React.Component {

  render(){
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
          <Route exact path="/dashboard/home"element={<HomeDashboard />} />

          <Route element={<RequireAuth allowedRoles={ROLES.User} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>

    </Routes>
  );
}
}


export default LoginLayout;