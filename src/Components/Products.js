// import './Products.css';
import ProductCard from "./ProductCard";

const Products = ({products}) =>
{
    console.log(products)
    
    return (
            <div className='products'>
                {products.length > 0 ?
                        products.map(product =>
                                {
                                    return <ProductCard item={product.item}
                                                        price={product.price}
                                                        salePrice={product.salePrice}
                                                        stockLevels={product.stockLevels}
                                                        id={product.id}
                                                        key={product.id}/>
                                }
                        )
                        : "No products match your filters"}
            </div>
    );
}

export default Products;
