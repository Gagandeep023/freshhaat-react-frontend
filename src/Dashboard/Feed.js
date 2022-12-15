import Post from './Post';
import ProductDetail from './productDetail';

const Feed = ({ productDetail }) => {
    return (
        <>
            {productDetail.map(productDetail => (
                <ProductDetail key={productDetail.id} productDetail={productDetail} />
            ))}
        </>
    )
}

export default Feed
