import { createSlice } from "@reduxjs/toolkit";
import collectionService from "../services/collection.service";
import { productsReceived } from "./products";

const collectionsSlice = createSlice({
    name: "collections",
    initialState: {
        entities: {},
        isLoading: true,
        error: null
    },
    reducers: {
        collectionRequested(state) {
            state.isLoading = true;
        },
        collectionRequestFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        collectionReceived(state, action) {
            state.entities[action.payload.path] = action.payload.data.map(
                (product) => product._id
            );
            state.isLoading = false;
        }
    }
});

const { reducer: collectionsReducer, actions } = collectionsSlice;
const { collectionRequested, collectionRequestFailed, collectionReceived } =
    actions;

export const getCollectionLoadingStatus = (state) =>
    state.collections.isLoading;
export const getCollectionByPath = (path) => (state) =>
    state.collections.entities[path];

export const getAllCollections = (state) => state.collections.entities;

export const loadCollection = (search) => async (dispatch) => {
    try {
        dispatch(collectionRequested());
        const data = await collectionService.get(search);
        dispatch(
            collectionReceived({
                data,
                path: search.path
            })
        );
        dispatch(productsReceived(data));
    } catch (error) {
        dispatch(collectionRequestFailed(error.message));
    }
};

export default collectionsReducer;
