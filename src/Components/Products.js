import './Products.css';
import ProductCard from "./ProductCard";
import Pagination from 'react-bootstrap/Pagination'
import {useEffect, useState} from "react";

const Products = ({products}) =>
{
    const PRODUCTS_PER_PAGE = 20
    const [activePage, setActivePage] = useState(1)
    
    let items = [];
    for(let number = 1; number <= Math.ceil(products.length / PRODUCTS_PER_PAGE); number++)
    {
        items.push(
                <Pagination.Item key={number} active={number === activePage} onClick={() => setActivePage(number)}>
                    {number}
                </Pagination.Item>,
        );
    }
    
    useEffect(() => {
        setActivePage(1)
    }, [products])
    
    return (
            <>
                <div>
                    {products.length > 0 ?
                            <div>{products.length} products found.</div>
                            : ""}
                </div>
                <Pagination>
                    <div className='products-grid'>
                        {products.length > 0 ?
                                products
                                .filter((x, i) => Math.ceil((i + 1) / PRODUCTS_PER_PAGE) === activePage)
                                .map(product =>
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
                </Pagination>
                <Pagination size="sm">{items}</Pagination>
            </>
    );
}

export default Products;
