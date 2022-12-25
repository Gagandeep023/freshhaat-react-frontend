import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [persist] = useLocalStorage('persist', false);
    const [accessAuth,] = useAuth('accessAuth', '');

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {

                isMounted && setIsLoading(false);
        }


        !accessAuth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [accessAuth?.accessToken, persist])

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin