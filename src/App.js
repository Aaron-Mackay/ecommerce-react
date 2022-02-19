import React, {useState, useEffect} from 'react';
import './App.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";

import ProductsPage from "./Components/ProductsPage";
import ProductPage from "./Components/ProductPage";
import {fetchWarehouseData, generateWarehouse, resetWarehouse} from "./databaseFunctions";

const App = () =>
{
    const [allProducts, setAllProducts] = useState([])
    
    useEffect(() =>
    {
        fetchWarehouseData()
        .then(setAllProducts)
    }, []);

    const getProduct = (id) =>
    {
        return allProducts.find(product => product.id.toString(10) === id)
    }
    
    const setWarehouseFromLocal = () => {
        setAllProducts(generateWarehouse())
    }
    
    return (
            <div>
                <button onClick={setWarehouseFromLocal}>Reset DB</button>
                <BrowserRouter>
                    <Routes>
                        <Route path="/product/:id" element={<ProductPage getProduct={getProduct}/>}/>
                        <Route path="/" element={<ProductsPage allProducts={allProducts}/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
    );
}

export default App;
