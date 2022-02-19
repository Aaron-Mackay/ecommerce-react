import React, {useState} from 'react';
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
    
    let initialFilters = {
        sizes: getAvailableSizes(),
        price: {
            max: null,
            min: null
        }
    }
    
    const [visibleProducts, setVisibleProducts] = useState(products)
    const [selectedFilters, setSelectedFilters] = useState(initialFilters)
    
    const getFilteredProducts = (filters) =>
    {
        const filteredProducts = [];
        products.filter(product =>
        {
            
            for(const size in product.stockLevels)
            {
                for(const sizeFilter of filters.sizes)
                {
                    if(size === sizeFilter && product.stockLevels[size] > 0)
                    {
                        filteredProducts.push(product)
                        return true
                    }
                }
            }
            return false
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
    
    return (
            <div className="products-page">
                <NavBar className="navBar"/>
                <Filters className="filters" onSaveFilters={onSaveFilters} filters={selectedFilters} possibleSizes={getAvailableSizes()}/>
                <Products className="products" products={visibleProducts} filters={selectedFilters}/>
                <Chat/>
            </div>
    );
}

export default ProductsPage;
