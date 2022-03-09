import Card from 'react-bootstrap/Card'
import mockImage from '../images/mockImage.jpg'
import './ProductCard.css';

import Badge from 'react-bootstrap/Badge'
import {LinkContainer} from 'react-router-bootstrap'

const ProductCard = ({item, price, stockLevels, salePrice, id, imageUrl}) =>
{
    return (
            <LinkContainer to={`/product/${id}`}>
                <Card style={{width: '18rem'}} bg={'secondary'} text={'white'}>
                    <Card.Img variant="top" src={imageUrl}/>
                    <Card.Body>
                        <h5 style={{margin: "0px"}}>
                            {item}
                            {salePrice ? <Badge bg="primary">On Sale</Badge> : ""}
                        </h5>
                    </Card.Body>
                    <Card.Body>
                        <div className={"size-grid"}>
                            {Object.entries(stockLevels).filter(stockLevel => stockLevel[1] > 0)
                            .map(stockLevel =>
                            {
                                return <div style={{border: "5px solid black;"}}>
                                    {stockLevel[0]}
                                </div>
                            })
                            }
                        </div>
                    </Card.Body>
                    <Card.Body>
                        <Card.Text style={{textAlign: "end"}}>
                            £{salePrice || price} &nbsp;
                            <del>{salePrice ? "£" + price : ""}</del>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </LinkContainer>
    );
}

export default ProductCard;
