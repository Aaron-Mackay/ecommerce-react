// import './Product.css';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import { useParams } from "react-router-dom";

const ProductPage = ({ getProduct, addToBasket }) => {
    const [selectedSize, setSelectedSize] = useState("")

    const { id } = useParams()
    const product = getProduct(id)

    const selectHandler = (size) => {
        console.log(size)
        setSelectedSize(size)
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Products</Breadcrumb.Item>
                <Breadcrumb.Item active>
                    {product.item}
                </Breadcrumb.Item>
            </Breadcrumb>
            <DropdownButton id="dropdown-basic-button" title={selectedSize || "Size"} onSelect={selectHandler}>
                {Object.entries(product.stockLevels).map(([size, stock], i) => {
                    return <Dropdown.Item href="#/action-1" key={i} eventKey={size} disabled={stock === 0}>{size}</Dropdown.Item>
                })}
            </DropdownButton>
            <Button onClick={() => addToBasket(product, selectedSize)} disabled={selectedSize === ""}>Add to basket</Button>
        </>

    );
}

export default ProductPage;
