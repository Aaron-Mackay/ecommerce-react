import React, { useState, useEffect } from 'react';
import './App.css';

import Button from 'react-bootstrap/Button';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProductsPage from "./Components/ProductsPage";
import ProductPage from "./Components/ProductPage";
import { fetchWarehouseData, generateWarehouse, resetWarehouse } from "./databaseFunctions";
import ShoppingCart from "./Components/ShoppingCart";

const App = () => {
    const [allProducts, setAllProducts] = useState([])
    const [basket, setBasket] = useState([])
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

    const addToBasket = (item, size) => {
        // todo reduce stock
        const selectedItem = { ...item }
        delete selectedItem.stockLevels
        selectedItem.size = size
        console.log(selectedItem)
        setBasket([...basket, selectedItem])
    }

    const removeFromBasket = (removedProduct) => {
        const newBasket = [...basket]
        for (let i = 0; i < newBasket.length; i++) {
            if (shallowCompare(removedProduct, newBasket[i])) {
                newBasket.splice(i, 1)
                setBasket(newBasket)
                return
            }
        }
    }

    const shallowCompare = (obj1, obj2) =>
        Object.keys(obj1).length === Object.keys(obj2).length &&
        Object.keys(obj1).every(key =>
            obj2.hasOwnProperty(key) && obj1[key] === obj2[key]
        );

    return (
        <>
            <Button variant="primary" onClick={setWarehouseFromLocal}>Reset DB</Button>
            <Button variant="primary" onClick={handleShow}>
                Shopping Cart
            </Button>
            
            <ShoppingCart show={show} handleClose={handleClose} basket={basket} removeFromBasket={removeFromBasket}/>

            <BrowserRouter>
                <Routes>
                    <Route path="/product/:id" element={<ProductPage getProduct={getProduct} addToBasket={addToBasket} />} />
                    <Route path="/" element={<ProductsPage allProducts={allProducts} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}



export default App;
