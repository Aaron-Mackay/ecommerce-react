// import './Product.css';

import {Link} from "react-router-dom";

const ProductCard = ({item, price, stockLevels, salePrice, id}) => {
    return (//todo onclick go to product page
            <Link to={`/product/${id}`}>
                <div className='product' style={{border: "1px solid white"}}>
                    <div style={{border: "1px solid white"}}>
                        Image{/* todo get image of product, link or storage */}
                    </div>
                    <h3>
                        {item}
                    </h3>
                    <div style={{border: "1px solid white"}}>
                        £{salePrice || price} <del>{salePrice ? "£" + salePrice : ""}</del>
                        <br/>
                        {Object.entries(stockLevels).map(item => item[0]).join(", ")}
                    </div>
                </div>
            </Link>
    );
}

export default ProductCard;
