import './Products.css';

function Products(props) {
    return (
            <div className='products'>
                {props.products.map(product =>
                        {
                            return <Product item={product.item} price={product.price} stockLevels={product.stockLevels} key={product.id}/>
                        }
                )}
            </div>
    );
}

export default Products;