import { useLocation, Navigate, Outlet } from "react-router-dom";
import ROLES from "../hooks/roles";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const [accessAuth,] = useAuth('accessAuth', '');

    const location = useLocation();

    return (
        accessAuth?.roles === allowedRoles || accessAuth?.roles === ROLES.Admin
            ? <Outlet />
            : accessAuth?.accessToken 
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;