import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesLoadingStatus, loadCategoriesList } from "../store/categories";
import { getCurrentUserId, getUserDataIsLoadingStatus, loadUser } from "../store/user";
import { loadProducts } from "../store/products";
import { getTagsLoadingStatus, loadTagsList } from "../store/tags";
import { getCart } from "../store/cart";
import { loadOrdersList } from "../store/orders";
import { getShopsLoadingStatus, loadShopsList } from "../store/shops";
import Loader from "../components/common/loader";

const AppLoader = ({ children }) => {
    const currentIserId = useSelector(getCurrentUserId);
    const isCategoriesLoading = useSelector(getCategoriesLoadingStatus);
    const isTagsLoading = useSelector(getTagsLoadingStatus);
    const isUserDataLoading = useSelector(getUserDataIsLoadingStatus);
    const isShopsLoading = useSelector(getShopsLoadingStatus);
    const cart = useSelector(getCart());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCategoriesList());
        dispatch(loadTagsList());
        dispatch(loadProducts(Object.keys(cart)));
        dispatch(loadShopsList());
        if (currentIserId) {
            dispatch(loadUser(currentIserId));
            dispatch(loadOrdersList(currentIserId));
        }
    }, [currentIserId]);

    if (isCategoriesLoading || isTagsLoading || isUserDataLoading || isShopsLoading) {
        return <div className="flex items-center justify-center min-h-screen">
            <Loader />
        </div>;
    }

    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AppLoader;
