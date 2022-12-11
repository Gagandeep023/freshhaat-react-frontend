import useLocalStorage from "./useLocalStorage";

const useAuth = (key, initValue) => {
    const [accessAuth, setAccessAuth] = useLocalStorage(key, initValue);

    const resetAccessAuth = (token) => {
        setAccessAuth(token);
    }

    return [accessAuth, resetAccessAuth];
}

export default useAuth;