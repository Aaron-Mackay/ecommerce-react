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
    const colours = ["Black", "White", "Pink", "Red", "Blue"]
    const items = ["Shoes"]//, "Boots", "Trainers", "Slippers", "Formal Shoes"]
    
    const products = [];
    
    let count = 1;
    for(let colour of colours)
    {
        for(let item of items)
        {
            const newProduct = {}
            newProduct.id = count
            newProduct.item = `${colour} ${item}`
            newProduct.price = newProduct.item.length * 5
            newProduct.salePrice = (count % 3 === 0) ? Math.round(newProduct.price / 2) : null
            newProduct.imageUrl = 'https://picsum.photos/200'
            // fetchProductImageUrl(newProduct.item)
            // .then(src => {
            //     newProduct.image = src
            // })
            
            const stockLevels = {}
            for(let i = 6; i <= 11; i++)
            {
                stockLevels[i] = 1
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

const fetchProductImageUrl = async(query ) =>
{
    const imageUrl = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
        headers: {
            authorization: "563492ad6f9170000100000185a2d47e349b4807a2a2fd2a39b98ed1"
        }
    })
    .then(resp =>
    {
        return resp.json()
    })
    .then(data =>
    {
        return data.error//data.photos[0].src.original
    })
    .catch(console.log)
    
    return imageUrl
}
