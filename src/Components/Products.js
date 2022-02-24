import './Products.css';
import ProductCard from "./ProductCard";

const Products = ({products}) =>
{
    return (
            <>
                <div>
                    {products.length > 0 ?
                            <div>{products.length} products found.</div>
                        : "" }
                </div>
                <div className='products-grid'>
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
            </>
    );
}

export default Products;
