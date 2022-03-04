import React, {useEffect, useState} from 'react';
import './App.css';

import Button from 'react-bootstrap/Button';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import ProductsPage from "./Components/ProductsPage";
import ProductPage from "./Components/ProductPage";
import {fetchWarehouseData, generateWarehouse, resetWarehouse} from "./databaseFunctions";
import ShoppingCart from "./Components/ShoppingCart";
import {Container, Navbar} from "react-bootstrap";
import {Launcher} from 'react-chat-window'

const App = () =>
{
    const [allProducts, setAllProducts] = useState([])
    const [basket, setBasket] = useState(() =>
    {
        // getting stored value
        return JSON.parse(localStorage.getItem("basket")) || [];
    });
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() =>
    {
        localStorage.setItem("basket", JSON.stringify(basket))
    }, [basket])
    
    // useEffect(() =>
    // {
    //     fetchWarehouseData()
    //     .then(setAllProducts)
    // }, []);
    
    const getProduct = (id) =>
    {
        return allProducts.find(product => product.id.toString(10) === id)
    }
    
    const setWarehouseFromLocal = () =>
    {
        setAllProducts(generateWarehouse())
    }
    
    const addToBasket = (item, size) =>
    {
        // todo reduce stock
        const selectedItem = {...item}
        delete selectedItem.stockLevels
        selectedItem.size = size
        console.log(selectedItem)
        setBasket([...basket, selectedItem])
    }
    
    const removeFromBasket = (removedProduct) =>
    {
        const newBasket = [...basket]
        for(let i = 0; i < newBasket.length; i++)
        {
            if(shallowCompare(removedProduct, newBasket[i]))
            {
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
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">Golden Shoe</Navbar.Brand>
                        <Navbar.Collapse className="justify-content-end">
                            <Button variant="primary" onClick={setWarehouseFromLocal}>
                                Reset DB
                            </Button>
                            <Button variant="primary" onClick={handleShow}>
                                Shopping Cart
                            </Button>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <ShoppingCart show={show} handleClose={handleClose} basket={basket} removeFromBasket={removeFromBasket}/>
                
                <BrowserRouter>
                    <Routes>
                        <Route path="/product/:id" element={<ProductPage getProduct={getProduct} addToBasket={addToBasket}/>}/>
                        <Route path="/" element={<ProductsPage allProducts={allProducts}/>}/>
                    </Routes>
                </BrowserRouter>
                <Launcher
                        agentProfile={{
                            teamName: 'Customer Support',
                            imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                        }}
                        messageList={[{author:'them', type: 'text', data: {text: "hello"}}]}
                        showEmoji
                />
            </>
    );
}


export default App;
