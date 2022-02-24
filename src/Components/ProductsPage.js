import React, {useEffect, useState} from 'react';
import './ProductsPage.css';

import Products from './Products';
import NavBar from './NavBar';
import Filters from './Filters';
import Chat from './Chat';

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
    const [selectedFilters, setSelectedFilters] = useState({})
    
    useEffect(() =>
    {
        const updatedFilters = {...selectedFilters}
        const availableSizes = getAvailableSizes()
        updatedFilters.sizes = availableSizes
        setVisibleProducts(getFilteredProducts(updatedFilters))
        setSelectedFilters(prevState => ({
            ...prevState,
            sizes: [...availableSizes]
    }))
    }, [products])
    
    const getFilteredProducts = (filters) =>
    {
        const filteredProducts = [];
        products.forEach(product =>
        {
            if (!Array.isArray(filters))
            {
                filteredProducts.push(product)
                return
            }
            for(const size in product.stockLevels)
            {
                
                for(const sizeFilter of filters.sizes)
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
            const isBelowMax = filters.max ? (price <= filters.max) : true;
            const isAboveMin = filters.min ? (price >= filters.min) : true;
            return (isBelowMax && isAboveMin)
        })
    }
    
    const onSaveFilters = (newFiltersObj) =>
    {
        console.log(newFiltersObj)
        setSelectedFilters(newFiltersObj);
        setVisibleProducts(getFilteredProducts(newFiltersObj))
    }
    
    const availableSizes = getAvailableSizes()
    return (
            <div className="products-page">
                <NavBar className="navBar"/>
                <Filters className="filters" onSaveFilters={onSaveFilters} filters={selectedFilters} availableSizes={availableSizes} getAvailableSizes={getAvailableSizes}/>
                <Products className="products" products={visibleProducts} filters={selectedFilters}/>
                <Chat/>
            </div>
    );
}

export default ProductsPage;
