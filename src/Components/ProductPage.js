// import './Product.css';

import {useParams} from "react-router-dom";

const ProductPage = ({getProduct}) =>
{
    const {id} = useParams()
    const product = getProduct(id)
    
    return (
            <div>
                {product.item}
            </div>
    );
}

export default ProductPage;
