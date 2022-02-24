import React, { useState, useEffect } from 'react';
import './App.css';

import Button from 'react-bootstrap/Button';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProductsPage from "./Components/ProductsPage";
import ProductPage from "./Components/ProductPage";
import { fetchWarehouseData, generateWarehouse, resetWarehouse } from "./databaseFunctions";
import ShoppingCart from "./Components/ShoppingCart";
import ShoppingCartProvider from "./ShoppingCartContext";

const App = () => {
    const [allProducts, setAllProducts] = useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // useEffect(() =>
    // {
    //     fetchWarehouseData()
    //     .then(setAllProducts)
    // }, []);

    const getProduct = (id) => {
        return allProducts.find(product => product.id.toString(10) === id)
    }

    const setWarehouseFromLocal = () => {
        setAllProducts(generateWarehouse())
    }

    return (
        <>
            <Button variant="primary" onClick={setWarehouseFromLocal}>Reset DB</Button>
            <Button variant="primary" onClick={handleShow}>
                Shopping Cart
            </Button>
            
            <ShoppingCart show={show} handleClose={handleClose}/>

            <BrowserRouter>
                <Routes>
                    <Route path="/product/:id" element={<ProductPage getProduct={getProduct}/>} />
                    <Route path="/" element={<ProductsPage allProducts={allProducts} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}



export default App;
