// import './Products.css';
import ProductCard from "./ProductCard";

function Products(props)
{
    console.log(props.products)
    
    return (
            <div className='products'>
                {props.products.length > 0 ?
                        props.products.map(product =>
                                {
                                    return <ProductCard item={product.item} price={product.price} salePrice={product.salePrice} stockLevels={product.stockLevels} key={product.id}/>
                                }
                        )
                        : "No products match your filters"}
            </div>
    );
}

export default Products;
