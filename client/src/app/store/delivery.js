import { createSlice } from "@reduxjs/toolkit";
import deliveryService from "../services/delivery.service";

const deliverySlice = createSlice({
    name: "delivery",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        deliveryRequested(state) {
            state.isLoading = true;
        },
        deliveryRequestFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        deliveryReceived(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: deliveryReducer, actions } = deliverySlice;
const { deliveryRequested, deliveryRequestFailed, deliveryReceived } = actions;

export const getDeliveryLoadingStatus = (state) => state.delivery.isLoading;
export const getDeliveryLists = (state) => state.delivery.entities;

export const loadDeliveryLists = () => async (dispatch) => {
    try {
        dispatch(deliveryRequested());
        const data = await deliveryService.get();
        dispatch(deliveryReceived(data));
    } catch (error) {
        dispatch(deliveryRequestFailed(error.message));
    }
};

export default deliveryReducer;
