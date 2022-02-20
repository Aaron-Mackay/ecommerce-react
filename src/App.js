import React, { useState, useEffect } from 'react';
import './App.css';

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProductsPage from "./Components/ProductsPage";
import ProductPage from "./Components/ProductPage";
import { fetchWarehouseData, generateWarehouse, resetWarehouse } from "./databaseFunctions";

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

    return (
        <div>
            <Button variant="primary" onClick={setWarehouseFromLocal}>Reset DB</Button>
            <Button variant="primary" onClick={handleShow}>
                Shopping Cart
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>

            <BrowserRouter>
                <Routes>
                    <Route path="/product/:id" element={<ProductPage getProduct={getProduct} addToBasket={addToBasket} />} />
                    <Route path="/" element={<ProductsPage allProducts={allProducts} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
