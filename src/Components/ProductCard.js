// import './Product.css';

function ProductCard(props) {
    const {item, price, stockLevels, salePrice} = props
    return (//todo onclick go to product page
            <div className='product' style={{border: "1px solid white"}}>
                <div style={{border: "1px solid white"}}>
                    Image
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
    );
}

export default ProductCard;
