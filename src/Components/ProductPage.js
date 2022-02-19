// import './Product.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

import {useParams} from "react-router-dom";

const ProductPage = ({getProduct}) =>
{
    const {id} = useParams()
    const product = getProduct(id)
    
    return (
            <Breadcrumb>
                <Breadcrumb.Item href="/">Products</Breadcrumb.Item>
                <Breadcrumb.Item active>
                    {product.item}
                </Breadcrumb.Item>
            </Breadcrumb>
    );
}

export default ProductPage;
