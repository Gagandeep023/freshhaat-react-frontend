import moment from 'moment';
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const AuthVerify = () => {
    const [accessAuth,] = useAuth('accessAuth', '');

    const checkExpiry = moment().isAfter(accessAuth?.expires
      );

      if (accessAuth) {
        if (checkExpiry) {
          localStorage.clear();
        } 
      }
     
    return (
        <>
            < Outlet />
        </>
    )
  };
export default AuthVerify;