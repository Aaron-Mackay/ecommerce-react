import React, {useEffect, useState} from 'react';
import './ProductsPage.css';

import Products from './Products';
import NavBar from './NavBar';
import Filters from './Filters';
import Chat from './Chat';
import {LinkContainer} from "react-router-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const ProductsPage = ({allProducts: products}) =>
{
    const getAvailableSizes = () =>
    {
        const possibleSizes = [];
        products.forEach(product =>
        {
            possibleSizes.push(...Object.entries(product.stockLevels).map(x => x[0]))
        })
        return [...new Set(possibleSizes)]
    }
    
    const [visibleProducts, setVisibleProducts] = useState(products)
    const [enteredMax, setEnteredMax] = useState('')
    const [enteredMin, setEnteredMin] = useState('')
    const [enteredSizes, setEnteredSizes] = useState([])
    const filtersObject = {
        enteredMax, setEnteredMax,
        enteredMin, setEnteredMin,
        enteredSizes, setEnteredSizes
    }
    
    useEffect(() =>
    {
        setVisibleProducts(getFilteredProducts())
    },[enteredMax, enteredMin, enteredSizes])
    
    useEffect(() =>
    {
        const availableSizes = getAvailableSizes()
        setVisibleProducts(getFilteredProducts())
        setEnteredSizes(availableSizes)
    }, [products])
    
    const getFilteredProducts = () =>
    {
        const filteredProducts = [];
        products.forEach(product =>
        {
            for(const size in product.stockLevels)
            {
                
                for(const sizeFilter of enteredSizes)
                {
                    if(size === sizeFilter && product.stockLevels[size] > 0)
                    {
                        filteredProducts.push(product)
                        return
                    }
                }
            }
        })
        return filteredProducts.filter(product =>
        {
            const price = (product.salePrice || product.price);
            const isBelowMax = enteredMax ? (price <= enteredMax) : true;
            const isAboveMin = enteredMin ? (price >= enteredMin) : true;
            return (isBelowMax && isAboveMin)
        })
    }
    
    return (
            <>
                <Breadcrumb>
                    <Breadcrumb.Item active>
                        Products
                    </Breadcrumb.Item>
                </Breadcrumb>
            <div className="products-page">
                <Filters className="filters" filtersObject={filtersObject} availableSizes={getAvailableSizes()}/>
                <Products className="products" products={visibleProducts}/>
                <Chat/>
            </div>
            </>
    );
}

export default ProductsPage;
