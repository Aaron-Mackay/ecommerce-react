import Card from 'react-bootstrap/Card'
import mockImage from '../mockImage.jpg'

import {Link} from "react-router-dom";

const ProductCard = ({item, price, stockLevels, salePrice, id}) => {
    return (//todo onclick go to product page
            <Link to={`/product/${id}`}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={mockImage}/>
                    <Card.Body>
                        <Card.Title>{item}</Card.Title>
                        <Card.Text>
                            {Object.entries(stockLevels).map(item => item[0]).join(", ")}
                        </Card.Text>
                    </Card.Body>
                    <Card.Body>
                        <Card.Text>
                            £{salePrice || price} <del>{salePrice ? "£" + price : ""}</del>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
    );
}

export default ProductCard;
