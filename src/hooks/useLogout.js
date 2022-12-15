const useLogout = () => {
    const logout = async () => {
        localStorage.clear();
    }
    return logout;
}

export default useLogout