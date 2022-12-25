import moment from 'moment';
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const AuthNavigate = ({ }) => {
  const [accessAuth,] = useAuth('accessAuth', '');

  const location = useLocation();

  return (
       accessAuth?.accessToken 
              ? <Navigate to="/dashboard/home" state={{ from: location }} replace />
              : <Outlet />
  );
};
export default AuthNavigate;