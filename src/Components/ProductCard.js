import Card from 'react-bootstrap/Card'
import mockImage from '../mockImage.jpg'

import Badge from 'react-bootstrap/Badge'
import {LinkContainer} from 'react-router-bootstrap'

const ProductCard = ({item, price, stockLevels, salePrice, id}) =>
{
    return (
            <LinkContainer to={`/product/${id}`}>
                <Card style={{width: '18rem'}} bg={'secondary'} text={'white'}>
                    <Card.Img variant="top" src={mockImage}/>
                    <Card.Body>
                        <Card.Title>
                            {item}
                            {salePrice ? <Badge bg="primary">On Sale</Badge> : ""}
                        </Card.Title>
                        <Card.Text>
                            {Object.entries(stockLevels).map(item => item[0]).join(", ")}
                        </Card.Text>
                    </Card.Body>
                    <Card.Body>
                        <Card.Text>
                            £{salePrice || price}
                            <del>{salePrice ? "£" + price : ""}</del>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </LinkContainer>
    );
}

export default ProductCard;
