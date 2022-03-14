import React, {useState} from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import ShoppingCartProduct from "./ShoppingCartProduct";

const ShoppingCart = ({show, handleClose, basket, removeFromBasket, placeOrder}) =>
{
    const [discount, setDiscount] = useState(0.0)
    const [discountCode, setDiscountCode] = useState('')
    const [invalidCode, setInvalidCode] = useState(false)
    const totalPrice = (1 - discount) * basket.reduce((prev, curr) => prev + (curr.salePrice || curr.price), 0)
    
    const validCodes = {
        "20off": 0.2,
        "10off": 0.1,
        "halfprice": 0.5
    }
    
    const handleDiscountCode = (event) =>
    {
        setDiscountCode(event.target.value)
    }
    
    const handleDiscountCodeSubmit = (event) =>
    {
        event.preventDefault()
        
        if (validCodes[discountCode])
        {
            setDiscount(validCodes[discountCode] || 0)
            setInvalidCode(false)
        }
        else
        {
            setInvalidCode(true)
        }
        
        setDiscountCode('')
    }
    
    return (
            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
                </Offcanvas.Header>
                {basket.length > 0 ?
                        <>
                            <form onSubmit={handleDiscountCodeSubmit} style={{backgroundColor: "lightgrey", display: "flex", padding: "1em"}}>
                                <input type="text" value={discountCode} onChange={handleDiscountCode} placeholder={"Discount code"} style={invalidCode ? {border:"1px solid red"} : {}}/>
                                <Button variant="primary" type="submit" style={{marginLeft: "auto"}} disabled={discountCode.length === 0}>Apply</Button>
                            </form>
                            {discount > 0 ?
                                    <Offcanvas.Body style={{backgroundColor: "lightgrey", display: "flex", flexGrow: "0"}}>
                                        <h5 style={{marginBottom: "0"}}>Discount:  -£{(totalPrice*discount).toFixed(2)}</h5>
                                    </Offcanvas.Body>
                                    : ""
                            }
                            <Offcanvas.Body style={{backgroundColor: "lightgrey", display: "flex", flexGrow: "0", overflowY:"visible", alignItems:"center"}}>
                                <h3 style={{marginBottom: "0"}}>Total: £{totalPrice.toFixed(2)}</h3>
                                <Button variant="primary" onClick={placeOrder} style={{marginLeft: "auto", height: "100%"}} >
                                    Checkout
                                </Button>
                            </Offcanvas.Body>
                        </>
                        : ""
                }
                <Offcanvas.Body style={{margin: "auto"}}>
                    {basket.map((product, i) => <ShoppingCartProduct product={product} removeFromBasket={removeFromBasket} i={i} key={i}/>)}
                </Offcanvas.Body>
            </Offcanvas>
    )
}

export default ShoppingCart;
