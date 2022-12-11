import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {

    const [accessAuth,] = useAuth('accessAuth', '');

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `${accessAuth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [accessAuth])

    return axiosPrivate;
}

export default useAxiosPrivate;