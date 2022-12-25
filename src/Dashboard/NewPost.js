import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';
import useAxiosFetch from '../hooks/useAxiosFetch';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const NewPost = () => {
    const [postProductName, setPostProductName] = useState('');
    const [postFarmAddress, setPostFarmAddress] = useState('');
    const [postCropTime, setPostCropTime] = useState('');
    const [postproductId, setPostProductId] = useState('');
    const [productList, setProductList] = useState([])

    const { productDetail, setProductDetail } = useContext(DataContext);
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const cropTime = format(new Date(), 'MMMM dd, yyyy pp');
        const newProduct = { product_id: postproductId, crop_time: postCropTime, farm_address: postFarmAddress };
        try {
            const response = await axiosPrivate.post('/api/v1/dashboard/details', newProduct);
            setPostProductName('');
            setPostFarmAddress('');
            setPostCropTime('')
            navigate('/dashboard/home');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }
    const { data } = useAxiosFetch('/api/v1/dashboard/product-list');

    let dataValue;
    if(data && data.productList){
        dataValue = data
    }
    useEffect(() => {
        if(dataValue)
            setProductList(dataValue.productList);
    }, [dataValue] )

    return (
        <main className="NewPost">
            <h2>New Post</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postProductId">Product:</label>
                <select 
                id="postproductId"
                value={postproductId} 
                onChange={(e) => setPostProductId(e.target.value)}
                required>
                    <option >
                        Choose Product
                    </option>
                    {
                     productList.map((item, index) => (
                    <option key={index} value={item.product_id}>
                        {item.product_name}
                    </option>
                    ))}
                </select>

                <label htmlFor="postCropTime">Crop time:</label>
                <input
                    id="postCropTime"
                    type="datetime-local"
                    required
                    value={postCropTime}
                    onChange={(e) => setPostCropTime(e.target.value)}

                />
                <label htmlFor="postFarmAddress">Farm Address</label>
                <input
                    id="postFarmAddress"
                    required
                    type="text"
                    value={postFarmAddress}
                    onChange={(e) => setPostFarmAddress(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default NewPost
