import { Link } from 'react-router-dom';

const ProductDetail = ({ productDetail }) => {
    return (
        <article className="post">
            <Link to={`/post/${productDetail.id}`}>
                <h2>{productDetail.product_name}</h2>
                <p className="postDate">{productDetail.crop_time}</p>
            </Link>
            <p className="postBody">{
                (productDetail.farm_address).length <= 25
                    ? productDetail.farm_address
                    : `${(productDetail.farm_address).slice(0, 25)}...`
            }</p>
        </article>
    )
}

export default ProductDetail
