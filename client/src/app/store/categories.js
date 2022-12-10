import { createSlice } from "@reduxjs/toolkit";
import categoriesService from "../services/categories.service";

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        entities: [],
        isLoading: true,
        error: null
    },
    reducers: {
        categoriesRequested(state) {
            state.isLoading = true;
        },
        categoriesRequestFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        categoriesReceived(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: categoriesReducer, actions } = categoriesSlice;
const { categoriesRequested, categoriesRequestFailed, categoriesReceived } =
    actions;

export const getCategoriesLoadingStatus = (state) => state.categories.isLoading;
export const getCategoriesList = (state) => state.categories.entities;
export const getCategoryByPath = (path) => (state) =>
    state.categories.entities.find((c) => c.path === path);

export const loadCategoriesList = () => async (dispatch) => {
    try {
        dispatch(categoriesRequested());
        const data = await categoriesService.get();
        dispatch(categoriesReceived(data));
    } catch (error) {
        dispatch(categoriesRequestFailed(error.message));
    }
};

export default categoriesReducer;
