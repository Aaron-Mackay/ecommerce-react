export const reducer = (state, action) => {
    const shallowCompare = (obj1, obj2) =>
            Object.keys(obj1).length === Object.keys(obj2).length &&
            Object.keys(obj1).every(key =>
                    obj2.hasOwnProperty(key) && obj1[key] === obj2[key]
            );
    
    switch (action.type) {
        case "ADD_TO_BASKET":
            return [
                ...state,
                {
                    id: Math.random(), // not really unique but it's just an example
                    salePrice: action.product.salePrice,
                    price: action.product.price,
                    item: action.product.item,
                    size: action.product.size
                }
            ];
        case "REMOVE_FROM_BASKET":
            const newShoppingCart = [...state]
            for (let i = 0; i < newShoppingCart.length; i++) {
                if (shallowCompare(action.product, newShoppingCart[i])) {
                    newShoppingCart.splice(i, 1)
                }
            }
            return newShoppingCart;
        default:
            return state;
    }
};
