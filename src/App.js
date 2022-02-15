import React, {useState} from 'react';
import './App.css';

import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import ProductsPage from "./Components/ProductsPage";
import NavBar from "./Components/NavBar";
import ProductPage from "./Components/ProductPage";

const App = () =>
{
    const allProducts = [ // todo replace with db call
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
    
    const getProduct = ( id ) => {
        return allProducts.find( product => product.id.toString(10) === id)
    }
    
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/product/:id" element={<ProductPage getProduct={getProduct}/>}/>
                    <Route path="/" element={<ProductsPage allProducts={allProducts}/>}/>
                </Routes>
            </BrowserRouter>
    );
}

export default App;
