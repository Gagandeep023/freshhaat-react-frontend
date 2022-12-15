import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [productDetail, setProductDetail] = useState([])
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const { data, fetchError, isLoading } = useAxiosFetch('/api/v1/dashboard/details');

    useEffect(() => {
        setProductDetail(data);

    }, [data])

    useEffect(() => {
        const filteredResults = productDetail.filter((productDetail) =>
            ((productDetail.farm_address).toLowerCase()).includes(search.toLowerCase())
            || ((productDetail.product_name).toLowerCase()).includes(search.toLowerCase()));

        setSearchResults(filteredResults.reverse());
    }, [productDetail, search])

    return (
        <DataContext.Provider value={{
            search, setSearch,
            searchResults, fetchError, isLoading,
            productDetail, setProductDetail
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;