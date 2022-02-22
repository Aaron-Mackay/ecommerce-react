import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";

const ShoppingCart = ({show, handleClose, basket, removeFromBasket}) =>
{
    return <Offcanvas show={show} onHide={handleClose} placement={"end"}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {basket.map((product, i) =>
            {
                return <Card style={{width: '18rem'}} key={i}>
                    <Card.Img variant="top" src="holder.js/100px180"/>
                    <Card.Body>
                        <Card.Title>{product.salePrice || product.price}</Card.Title>
                        <Card.Text>
                            {product.item}
                            <br/>
                            Size: {product.size}
                        </Card.Text>
                        <CloseButton onClick={() => removeFromBasket(product)}/>
                    </Card.Body>
                </Card>
            })}
        </Offcanvas.Body>
    </Offcanvas>
}

export default ShoppingCart;
