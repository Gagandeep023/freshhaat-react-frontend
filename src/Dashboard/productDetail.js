import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const ProductDetail = ({ productDetail }) => {
    return (
        <div class="row">
        <article className="post PostColumnLeft">
            <Link to={`/dashboard/product-details?productId=${productDetail.product_id}&productShopId=${productDetail.user_id}`}>
                <h2>{"Product Name: " + productDetail.product_name}</h2>
                <p className="postBody">{"Harvest Time: " + format(new Date(productDetail.crop_time), 'MMMM dd, yyyy pp')
}</p>
            </Link>
            <p className="postBody">{
                    "Farm Address: " + productDetail.farm_address
            }</p>
        </article>
        {/* <img src={productDetail.product_image} alt="Logo" /> */}
        <div class="post PostColumnRight ">
            <img className="postImage" src={productDetail.product_image} alt=""/>
            </div>

        </div>

    )
}

export default ProductDetail
