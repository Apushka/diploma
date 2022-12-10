import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import categoriesReducer from "./categories";
import collectionsReducer from "./collections";
import deliveryReducer from "./delivery";
import ordersReducer from "./orders";
import productsReducer from "./products";
import shopsReducer from "./shops";
import tagsReducer from "./tags";
import userReducer from "./user";

const rootReducer = combineReducers({
    categories: categoriesReducer,
    collections: collectionsReducer,
    tags: tagsReducer,
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    delivery: deliveryReducer,
    orders: ordersReducer,
    shops: shopsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}

export default createStore;
