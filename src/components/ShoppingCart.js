import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import ShoppingCartProduct from "./ShoppingCartProduct";

const ShoppingCart = ({show, handleClose, basket, removeFromBasket, placeOrder}) =>
{
    const totalPrice = basket.reduce((prev, curr) => prev + (curr.salePrice || curr.price),0)
    
    return (
            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
                </Offcanvas.Header>
                {basket.length > 0 ?
                        <Offcanvas.Body style={{backgroundColor: "lightgrey", display:"flex", flexGrow: "0"}}>
                            <h3 style={{marginBottom:"0"}}>Total: £{totalPrice.toFixed(2)}</h3>
                            <Button variant="primary" onClick={placeOrder} style={{marginLeft:"auto"}}>
                                Checkout
                            </Button>
                        </Offcanvas.Body>
                        : ""
                }
                <Offcanvas.Body>
                    {basket.map((product, i) => <ShoppingCartProduct product={product} removeFromBasket={removeFromBasket} i={i}/>)}
                </Offcanvas.Body>
            </Offcanvas>
    )
}

export default ShoppingCart;
