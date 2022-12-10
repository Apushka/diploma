import { createSlice } from "@reduxjs/toolkit";
import shopsService from "../services/shops.service";

const shopsSlice = createSlice({
    name: "shops",
    initialState: {
        entities: [],
        isLoading: true,
        error: null
    },
    reducers: {
        shopsRequested(state) {
            state.isLoading = true;
        },
        shopsRequestFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        shopsReceived(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: shopsReducer, actions } = shopsSlice;
const { shopsRequested, shopsRequestFailed, shopsReceived } = actions;

export const getShopsLoadingStatus = (state) => state.shops.isLoading;
export const getShopsList = (state) => state.shops.entities;

export const loadShopsList = () => async (dispatch) => {
    try {
        dispatch(shopsRequested());
        const data = await shopsService.get();
        dispatch(shopsReceived(data));
    } catch (error) {
        dispatch(shopsRequestFailed(error.message));
    }
};

export default shopsReducer;
