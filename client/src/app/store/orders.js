import { createSlice } from "@reduxjs/toolkit";
import ordersService from "../services/orders.service";
import history from "../utils/history";
import { emptyCart } from "./cart";

const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        newOrder: null,
        orders: null,
        isLoading: true,
        error: null
    },
    reducers: {
        newOrderAppend: (state, action) => {
            state.newOrder = { ...state.newOrder, ...action.payload };
        },
        orderCreateRequested: (state) => {
            state.isLoading = true;
        },
        orderCreateSuccess: (state, action) => {
            state.orders = state.orders
                ? [...state.orders, action.payload]
                : [action.payload];
            state.newOrder = null;
            state.isLoading = false;
        },
        orderCreateFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        ordersRequested(state) {
            state.isLoading = true;
        },
        ordersRequestFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        ordersReceived(state, action) {
            state.orders = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: ordersReducer, actions } = ordersSlice;
const {
    ordersRequested,
    ordersRequestFailed,
    ordersReceived,
    newOrderAppend,
    orderCreateRequested,
    orderCreateSuccess,
    orderCreateFailed
} = actions;

export const getOrdersLoadingStatus = (state) => state.orders.isLoading;
export const getOrdersList = (state) => {
    if (state.orders.orders) {
        return [...state.orders.orders].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    } else return null;
};
export const getOrderById = (orderId) => (state) =>
    state.orders.orders?.find((o) => o._id === orderId);

export const constructNewOrder = (data) => (dispatch) => {
    dispatch(newOrderAppend(data));
};

export const createOrder = () => async (dispatch, getState) => {
    dispatch(orderCreateRequested());
    try {
        const payload = getState().orders.newOrder;
        const data = await ordersService.create(payload);
        dispatch(orderCreateSuccess(data));
        dispatch(emptyCart());
        history.push("/order/success");
    } catch (e) {
        dispatch(orderCreateFailed(e.message));
    }
};

export const loadOrdersList = (userId) => async (dispatch) => {
    try {
        dispatch(ordersRequested());
        const data = await ordersService.get(userId);
        dispatch(ordersReceived(data));
    } catch (error) {
        dispatch(ordersRequestFailed(error.message));
    }
};

export default ordersReducer;
