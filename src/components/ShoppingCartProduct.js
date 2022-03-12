import React from "react";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";
import useImage from "./useImage";
import mockImage from "../images/mockImage.jpg";

const ShoppingCartProduct = ({product, removeFromBasket, i}) =>
{
    const toTitleCase = (str) =>
    {
        return str.toLowerCase().split('-').map((word) =>
        {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
    }
    
    const {loading, image} = useImage(product.item)
    
    return <Card style={{width: '18rem', margin:"1em"}} key={i}>
        <Card.Img variant="top" src={loading ? mockImage : image} style={{height: "100%"}}/>
        <Card.Body>
            <Card.Title>£{product.salePrice || product.price}</Card.Title>
            <Card.Text>
                {toTitleCase(product.item)}
                <br/>
                Size: {product.size}
            </Card.Text>
            <CloseButton onClick={() => removeFromBasket(product)}/>
        </Card.Body>
    </Card>
}

export default ShoppingCartProduct;
