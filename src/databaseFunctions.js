import {
    createProduct as createProductMutation,
    createStockLevel as createStockLevelMutation,
    deleteProduct as deleteProductMutation,
    deleteStockLevel as deleteStockLevelMutation
} from './graphql/mutations';
import {API} from "aws-amplify";
import {listProducts, listStockLevels} from "./graphql/queries";

export const generateWarehouse = () =>
{
    const colours = ["black", "white", "pink", "red", "blue"]
    const items = ["shoes", "boots", "trainers", "heels"]
    
    const products = [];
    
    let count = 1;
    for(let colour of colours)
    {
        for(let item of items)
        {
            const newProduct = {}
            newProduct.id = count
            newProduct.item = `${colour}-${item}`.toLowerCase()
            newProduct.price = newProduct.item.length * 5
            newProduct.salePrice = (count % 3 === 0) ? Math.round(newProduct.price / 2) : null
            
            const stockLevels = {}
            for(let i = 5; i <= 9; i++)
            {
                stockLevels[i] = (Math.random() > 0.2) ? 1 : 0
            }
            
            newProduct.stockLevels = stockLevels
            products.push(newProduct)
            count++;
        }
    }
    
    console.log(products)
    
    return products
}

export const resetWarehouse = async() =>
{
    await fetchProducts()
    .then(fetchedProducts =>
    {
        fetchedProducts.forEach(product =>
        {
            console.log(product)
            deleteProduct(product.id)
        })
    })
    
    await fetchStockLevels()
    .then(stockLevels =>
    {
        stockLevels.forEach(stockLevel =>
        {
            console.log(stockLevel)
            deleteStockLevel(stockLevel.id)
        })
    })
    
    const products = generateWarehouse()
    products.forEach(product =>
    {
        const cleanProduct = {...product}
        delete cleanProduct.stockLevels
        createProduct(cleanProduct)
        .then(console.log("Created product ", product.item))
        .catch(console.log("Failed to create product ", product.item))
    })
    products.forEach(product =>
    {
        const stockLevels = product.stockLevels
        Object.entries(stockLevels).forEach(stockLevel => createStockLevel(stockLevel, product.id)
        .then(console.log("Created stocklevels for ", product.item))
        .catch(console.log("Failed to create stocklevels for ", product.item)))
    })
}

export const fetchWarehouseData = () =>
{
    const resProducts = fetchProducts()
    const resStockLevels = fetchStockLevels()
    return Promise.all([resProducts, resStockLevels])
    .then(([products, stockLevels]) =>
    {
        products.forEach(product =>
        {
            stockLevels.filter(x => x.productId === product.id).forEach(x =>
                    {
                        product.stockLevels[x.size] = x.stock
                    }
            )
            delete product.stockLevels.nextToken
        })
        return products
    })
}

export const createStockLevel = async(stockLevel, productId) =>
{
    const productStock = {}
    productStock.productId = productId
    productStock.size = stockLevel[0]
    productStock.stock = stockLevel[1]
    return API.graphql({query: createStockLevelMutation, variables: {input: productStock}});
}

export const createProduct = async(product) =>
{
    return API.graphql({query: createProductMutation, variables: {input: product}});
}

export const deleteProduct = async(id) =>
{
    return API.graphql({query: deleteProductMutation, variables: {input: {id}}});
}

export const deleteStockLevel = async(id) =>
{
    return API.graphql({query: deleteStockLevelMutation, variables: {input: {id}}});
}

export const fetchStockLevels = async() =>
{
    const apiData = await API.graphql({query: listStockLevels})
    return apiData.data.listStockLevels.items
}

export const fetchProducts = async() =>
{
    const apiData = await API.graphql({query: listProducts})
    return apiData.data.listProducts.items
}
