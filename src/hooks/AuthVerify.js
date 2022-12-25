import moment from 'moment';
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const AuthVerify = () => {
    const [accessAuth,] = useAuth('accessAuth', '');
    const navigate = useNavigate();
    const location = useLocation();

    const checkExpiry = moment().isAfter(accessAuth?.expires
      );

      if (accessAuth) {
        if (checkExpiry) {
          localStorage.clear();
          navigate('/login', { state: { from: location }, replace: true });

        } 
      }
     
    return (
        <>
            < Outlet />
        </>
    )
  };
export default AuthVerify;