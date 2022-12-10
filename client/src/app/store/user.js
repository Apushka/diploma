import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import { generateAuthError } from "../utils/generateAuthError";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken()
    ? {
          userData: null,
          error: null,
          auth: localStorageService.getUserId(),
          isLoggedIn: true,
          isLoading: false
      }
    : {
          userData: null,
          error: null,
          auth: null,
          isLoggedIn: false,
          isLoading: false
      };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userDataRequested: (state) => {
            state.error = null;
            state.isLoading = true;
        },
        userDataRequestSuccess: (state, action) => {
            state.userData = action.payload;
            state.isLoading = false;
        },
        userDataRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        userLoggedOut: (state) => {
            state.userData = null;
            state.auth = null;
            state.isLoggedIn = false;
        },
        authRequested: (state) => {
            state.error = null;
            state.isLoading = true;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
            state.isLoading = false;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        userDataUpdateRequested: (state) => {
            state.error = null;
        },
        userDataUpdateSuccess: (state, action) => {
            state.userData = action.payload;
        },
        userDataUpdateFailed: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { reducer: userReducer, actions } = userSlice;
const {
    authRequested,
    authRequestSuccess,
    authRequestFailed,
    userDataRequested,
    userDataRequestSuccess,
    userDataRequestFailed,
    userLoggedOut,
    userDataUpdateRequested,
    userDataUpdateSuccess,
    userDataUpdateFailed
} = actions;

export const getCurrentUserId = (state) => state.user.auth;
export const getUserData = (state) => state.user.userData;
export const getIsLoggedIn = (state) => state.user.isLoggedIn;
export const getUserDataIsLoadingStatus = (state) => state.user.isLoading;

export const signUp =
    ({ payload, redirect }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register(payload);
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess(data.userId));
            history.push(redirect);
        } catch (e) {
            dispatch(authRequestFailed(e.message));
        }
    };

export const logIn =
    ({ payload, redirect }) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.login({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess(data.userId));
            history.push(redirect);
        } catch (e) {
            const { code, message } = e.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authRequestFailed(errorMessage));
            } else {
                dispatch(authRequestFailed(e.message));
            }
        }
    };

export const loadUser = () => async (dispatch, getState) => {
    dispatch(userDataRequested());
    try {
        const userId = getState().user.auth;
        if (userId) {
            const data = await userService.get(userId);
            dispatch(userDataRequestSuccess(data));
        } else {
            dispatch(userDataRequestFailed(null));
        }
    } catch (e) {
        const { code, message } = e.response.data;
        if (code === 404) {
            const errorMessage = generateAuthError(message);
            dispatch(userDataRequestFailed(errorMessage));
        } else {
            dispatch(userDataRequestFailed(e.message));
        }
    }
};

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};

export const updateUserData = (payload) => async (dispatch) => {
    dispatch(userDataUpdateRequested());
    try {
        const data = await userService.update(payload);
        dispatch(userDataUpdateSuccess(data));
    } catch (e) {
        toast.error("Не удалось обновить информацию");
        dispatch(userDataUpdateFailed(e.message));
    }
};

export default userReducer;
