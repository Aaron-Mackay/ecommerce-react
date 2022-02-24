import React, {createContext, useReducer, useState} from "react";
import {reducer} from "./reducer";

export const ShoppingCartContext = createContext();

const ShoppingCartProvider = ({ children }) => {
    const [shoppingCart, dispatch] = useReducer(reducer,[]);
    
    const addToShoppingCart = (item, size) => {
        // todo reduce stock
        const selectedItem = { ...item }
        delete selectedItem.stockLevels
        selectedItem.size = size
        console.log(selectedItem)
        dispatch({type: "ADD_TO_BASKET", product: selectedItem})
    }
    
    const removeFromShoppingCart = (removedProduct) => {
        dispatch({type: "REMOVE_FROM_BASKET", product: removedProduct})
    }
    
    return (
            <ShoppingCartContext.Provider value={{ shoppingCart, addToShoppingCart, removeFromShoppingCart }}>
                {children}
            </ShoppingCartContext.Provider>
    );
};

export default ShoppingCartProvider;
