import React, {useEffect, useState} from 'react';
import './ProductsPage.css';

import Products from './Products';
import Filters from './Filters';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import cloneDeep from "lodash/cloneDeep";

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
    
    const [unfilteredPriceLimits, setUnfilteredPriceLimits] = useState([0, 100])
    const [visibleProducts, setVisibleProducts] = useState(products)
    const [priceRangeValues, setPriceRangeValues] = useState([...unfilteredPriceLimits])
    const [enteredSizes, setEnteredSizes] = useState([])
    const [enteredSort, setEnteredSort] = useState('Sale')
    const [enteredSaleSwitch, setEnteredSaleSwitch] = useState([])
    const filtersObject = {
        priceRangeValues, setPriceRangeValues,
        enteredSizes, setEnteredSizes,
        enteredSort, setEnteredSort,
        enteredSaleSwitch, setEnteredSaleSwitch
    }
    
    useEffect(() =>
    {
        setVisibleProducts(getFilteredProducts())
    }, [priceRangeValues, enteredSizes, enteredSort, enteredSaleSwitch, products])
    
    useEffect(() =>
    {
        const availableSizes = getAvailableSizes()
        const priceLimits = getPriceLimits(products)
        setVisibleProducts(getFilteredProducts())
        setEnteredSizes(availableSizes)
        setPriceRangeValues(priceLimits)
        setUnfilteredPriceLimits(priceLimits)
    }, [products])
    
    const getFilteredProducts = () =>
    {
        const sizeFilteredProducts = filterForSize(products, enteredSizes)
        const saleFilteredProducts = filterForSale(sizeFilteredProducts, enteredSaleSwitch)
        const sizeAndPriceFilteredProducts = filterForPrice(saleFilteredProducts, priceRangeValues)
        return sortProducts(sizeAndPriceFilteredProducts, enteredSort);
    }
    
    const getPriceLimits = (productsArr) =>
    {
        if(productsArr.length === 0)
        {
            return []
        }
        const max = Math.max.apply(Math, productsArr.map(product => product.salePrice || product.price))
        const min = Math.min.apply(Math, productsArr.map(product => product.salePrice || product.price))
        return [min, max];
    }
    
    return (
            <>
                <Breadcrumb>
                    <Breadcrumb.Item active>
                        Products
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="products-page">
                    <Filters filtersObject={filtersObject}
                             availableSizes={getAvailableSizes()}
                             unfilteredPriceLimits={unfilteredPriceLimits}/>
                    <Products products={visibleProducts}/>
                </div>
            </>
    );
}

const filterForSize = (products, sizeFilterArr) =>
{
    const filteredProducts = [];
    products.forEach(product =>
    {
        for(const size in product.stockLevels)
        {
            
            for(const sizeFilter of sizeFilterArr)
            {
                if(size === sizeFilter && product.stockLevels[size] > 0)
                {
                    filteredProducts.push(product)
                    return
                }
            }
        }
    })
    return filteredProducts
}

const filterForPrice = (products, priceRange) =>
{
    const [priceMin, priceMax] = priceRange
    return products.filter(product =>
    {
        const price = (product.salePrice || product.price);
        const isBelowMax = priceMax ? (price <= priceMax) : true;
        const isAboveMin = priceMin ? (price >= priceMin) : true;
        return (isBelowMax && isAboveMin)
    })
}

const sortProducts = (products, sortBy) =>
{
    const sortArray = cloneDeep(products)
    let sortFunction;
    switch(sortBy)
    {
        case 'Sale':
            sortFunction = (a, b) =>
            {
                if(a.salePrice && !b.salePrice)
                {
                    return -1
                }
                if(!a.salePrice && b.salePrice)
                {
                    return 1
                }
                return 0
            }
            break;
        case 'Price: High to Low':
            sortFunction = (a, b) =>
            {
                const productAPrice = a.salePrice || a.price
                const productBPrice = b.salePrice || b.price
                if(productAPrice > productBPrice)
                {
                    return -1
                }
                if(productBPrice > productAPrice)
                {
                    return 1
                }
                return 0
            }
            break;
        case 'Price: Low to High':
            sortFunction = (a, b) =>
            {
                const productAPrice = a.salePrice || a.price
                const productBPrice = b.salePrice || b.price
                if(productAPrice > productBPrice)
                {
                    return 1
                }
                if(productBPrice > productAPrice)
                {
                    return -1
                }
                return 0
            }
            break;
    }
    
    return sortArray.sort(sortFunction)
}

const filterForSale = (products, filterSwitch) =>
{
    return (filterSwitch.length > 0) ? products.filter(product => product.salePrice) : products
}

export default ProductsPage;
