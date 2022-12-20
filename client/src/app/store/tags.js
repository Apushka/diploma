import { createSlice } from "@reduxjs/toolkit";
import tagsService from "../services/tags.service";

const tagsSlice = createSlice({
    name: "tags",
    initialState: {
        entities: [],
        isLoading: true,
        error: null
    },
    reducers: {
        tagsRequested(state) {
            state.isLoading = true;
        },
        tagsRequestFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        tagsReceived(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: tagsReducer, actions } = tagsSlice;
const { tagsRequested, tagsRequestFailed, tagsReceived } = actions;

export const getTagsLoadingStatus = (state) => state.tags.isLoading;
export const getTagsList = (state) => state.tags.entities;
export const getTagById = (id) => (state) =>
    state.tags.entities.find((t) => t._id === id);
export const getTagByPath = (path) => (state) =>
    state.tags.entities.find((t) => t.path === path);
export const getTagsByIds = (ids) => (state) => {
    return ids.map((id) => state.tags.entities.find((t) => t._id === id));
};
export const loadTagsList = () => async (dispatch) => {
    try {
        dispatch(tagsRequested());
        const data = await tagsService.get();
        dispatch(tagsReceived(data));
    } catch (error) {
        dispatch(tagsRequestFailed(error.message));
    }
};

export default tagsReducer;
