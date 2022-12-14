import { useState, useEffect } from 'react';
import useAxiosPrivate from './useAxiosPrivate';

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                const response = await axiosPrivate.get(url, {
                    signal: controller.signal
                });
                console.log(response.data);
                if (isMounted) {
                    setData(response.data);
                    setFetchError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message);
                    setData([]);
                }
            } finally {
                isMounted && setIsLoading(false);
            }
        }

        fetchData(dataUrl);

        const cleanUp = () => {
            isMounted = false;
        }

        return cleanUp;
    }, []);

    return { data, fetchError, isLoading };
}

export default useAxiosFetch;