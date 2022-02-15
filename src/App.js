import React, {useState} from 'react';
import './App.css';

import Products from './Components/Products';
import NavBar from './Components/NavBar';
import Filters from './Components/Filters';
import Chat from './Components/Chat';

function App()
{
    const products = [ // todo replace with db call
        {
            id: 1,
            item: "shoe",
            price: 30,
            salePrice: 20,
            stockLevels: {
                "9": 2,
                "10": 1
            }
        },
        {
            id: 2,
            item: "hat",
            price: 10,
            stockLevels: {
                "m": 1,
                "l": 2
            }
        }
    ]
    
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
    
    return (
            <div className="App-header">
                <NavBar/>
                <Filters onSaveFilters={onSaveFilters} filters={selectedFilters} possibleSizes={getAvailableSizes()}/>
                <Products products={visibleProducts} filters={selectedFilters}/>
                <Chat/>
            </div>
    );
}

export default App;
