import { createSlice } from "@reduxjs/toolkit";
import productsService from "../services/products.service";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: {},
        isLoading: true,
        error: null
    },
    reducers: {
        productsRequested(state) {
            state.isLoading = true;
        },
        productsRequestFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        productsReceived(state, action) {
            Array.isArray(action.payload)
                ? action.payload.forEach((product) => {
                      state.entities[product._id] = product;
                  })
                : (state.entities[action.payload._id] = action.payload);
            state.isLoading = false;
        }
    }
});

const { reducer: productsReducer, actions } = productsSlice;
export const { productsRequested, productsRequestFailed, productsReceived } =
    actions;

export const getProductsLoadingStatus = (state) => state.products.isLoading;
export const getProductById = (id) => (state) => {
    return state.products.entities[id];
};
export const getProductsByIds = (ids) => (state) => {
    return ids.map((id) => state.products.entities[id]);
};

export const getError = () => (state) => state.products.error;

export const loadProducts = (ids) => async (dispatch) => {
    try {
        dispatch(productsRequested());
        const data = [];
        for (const id of ids) {
            const product = await productsService.get(id);
            data.push(product);
        }
        dispatch(productsReceived(data));
    } catch (error) {
        dispatch(productsRequestFailed(error.message));
    }
};

export const loadProduct = (productId) => async (dispatch) => {
    try {
        dispatch(productsRequested());
        const data = await productsService.get(productId);
        dispatch(productsReceived(data));
    } catch (error) {
        dispatch(productsRequestFailed(error.message));
    }
};

export default productsReducer;
