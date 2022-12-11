import useAuth from "./useAuth";

const useLogout = () => {
    const [,resetAccessAuth] = useAuth('accessAuth', '');


    const logout = async () => {
        resetAccessAuth('');
    }

    return logout;
}

export default useLogout