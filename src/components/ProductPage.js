import './ProductPage.css';
import {useState} from "react";
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import {LinkContainer} from 'react-router-bootstrap'
import Image from 'react-bootstrap/Image'

import {useParams} from "react-router-dom";

const ProductPage = ({getProduct, addToBasket}) =>
{
    const [selectedSize, setSelectedSize] = useState("")
    
    const {id} = useParams()
    const product = getProduct(id)
    
    const selectHandler = (size) =>
    {
        setSelectedSize(size)
    }
    
    const addToBasketHandler = () =>
    {
        setSelectedSize("")
        addToBasket(product, selectedSize)
    }
    
    return (
            <>
                <Breadcrumb>
                    <LinkContainer to={"/"}>
                        <Breadcrumb.Item>Products</Breadcrumb.Item>
                    </LinkContainer>
                    <Breadcrumb.Item active>
                        {product.item}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <h1 className={'product-header'}>{product.item}</h1>
                <div className={'product-details'}>
                    <Image className={'productImage'} rounded src={product.imageUrl}/>
                    <div className={'productDesc'}>
                        <p >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                            occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <div className={'sizeBuy'}>
                            <div className={'price'}>
                                <h3>£{product.salePrice || product.price}</h3>&nbsp;
                                <del>{product.salePrice ? "£" + product.price : ""}</del>
                            </div>
                            <div className={'controls'}>
                                <DropdownButton id="dropdown-basic-button" title={selectedSize || "Size"} onSelect={selectHandler} >
                                    {Object.entries(product.stockLevels).map(([size, stock], i) =>
                                    {
                                        return <Dropdown.Item href="#/action-1" key={i} eventKey={size} disabled={stock === 0}>{size}</Dropdown.Item>
                                    })}
                                </DropdownButton>
                                <Button onClick={addToBasketHandler} disabled={selectedSize === ""}>Add to basket</Button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </>
    
    );
}

export default ProductPage;
