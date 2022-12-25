import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import DataContext from '../context/DataContext';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAxiosFetch from "../hooks/useAxiosFetch";
import axios from "../api/axios";
import './PostPage.css';
import { format } from "date-fns";



const ProductInfomation =  () => {
    const [searchParams] = useSearchParams();

    const productInfoId = searchParams.get('productInfoId');

    const [productDetail, setProductDetail] = useState({});

   

    const url = `/api/v1/dashboard/product-qr-code-details?productInfoId=${productInfoId}`;
    const { data } = useAxiosFetch(url);


    useEffect(() => {
        if(data && data.productDetails)
            data.productDetails.cropTime = format(new Date(data.productDetails.crop_time), 'MMMM dd, yyyy pp')
            setProductDetail(data.productDetails);
    }, [data] )

    return (
        <main >
                {productDetail &&
                    <div className="product">
                        <div className="product-img" id="product_image">
                        <span className="tag">new</span>
                        <img src={productDetail.product_image} alt=""/>
                        </div>
                        <div className="product-listing">
                            <div className="content">
                                <h2 className="name" id="product_name">{"Product Name: " + productDetail.product_name}</h2>
                                <p className="price" id="farm_address">{"Farm Address: " + productDetail.farm_address}</p>
                                <p className="price" id="crop_time">{"Harvest Time " +  productDetail.cropTime }</p>
                            </div>
                        </div>
                    </div>
                }
            <article >
                {!productDetail &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/dashboard/home'>Visit Our Homepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default ProductInfomation
