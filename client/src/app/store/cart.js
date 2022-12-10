import { createSlice } from "@reduxjs/toolkit";
import localStorageService from "../services/localStorage.service";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        entities: localStorageService.readCartFromStorage() || {}
    },
    reducers: {
        productIncreased(state, action) {
            if (state.entities[action.payload.productId]) {
                state.entities[action.payload.productId]++;
            } else {
                state.entities[action.payload.productId] = 1;
            }
        },
        productDecreased(state, action) {
            state.entities[action.payload.productId]--;
            if (!state.entities[action.payload.productId]) {
                delete state.entities[action.payload.productId];
            }
        },
        editCartFailed(state, action) {
            state.error = action.payload;
        },
        productRemoved(state, action) {
            delete state.entities[action.payload.productId];
        },
        cartEmptied: (state) => {
            state.entities = {};
        }
    }
});

const { reducer: cartReducer, actions } = cartSlice;
const {
    productIncreased,
    editCartFailed,
    productDecreased,
    productRemoved,
    cartEmptied
} = actions;

export const getCartProductQuantity = (productId) => (state) =>
    state.cart.entities[productId];
export const getCart = () => (state) => state.cart.entities;

export const increaseCartProductQuantity =
    (productId) => (dispatch, getState) => {
        try {
            dispatch(productIncreased({ productId }));
            localStorageService.writeCartToStorage(getState().cart.entities);
        } catch (error) {
            dispatch(editCartFailed(error.message));
        }
    };

export const decreaseCartProductQuantity =
    (productId) => (dispatch, getState) => {
        try {
            dispatch(productDecreased({ productId }));
            localStorageService.writeCartToStorage(getState().cart.entities);
        } catch (error) {
            dispatch(editCartFailed(error.message));
        }
    };

export const removeProductFromCart = (productId) => (dispatch, getState) => {
    try {
        dispatch(productRemoved({ productId }));
        localStorageService.writeCartToStorage(getState().cart.entities);
    } catch (error) {
        dispatch(editCartFailed(error.message));
    }
};

export const emptyCart = () => (dispatch) => {
    localStorageService.emptyCart();
    dispatch(cartEmptied());
};

export default cartReducer;
