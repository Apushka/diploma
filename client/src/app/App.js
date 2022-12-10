import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./layouts/main";
import Header from "./components/ui/header";
import Footer from "./components/ui/footer";
import AppLoader from "./hoc/appLoader";
import Products from "./layouts/products";
import Order from "./layouts/order";
import Shops from "./layouts/shops";
import Search from "./layouts/search";
import Filter from "./layouts/filter";
import Login from "./layouts/login";
import ProtectedRoute from "./components/common/protectedRoute";
import Profile from "./layouts/profile";
import Logout from "./layouts/logout";

function App() {
    return (
        <div className="App">
            <Header />
            <AppLoader>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <ProtectedRoute path="/order/:orderId?" component={Order} />
                    <Route path="/login" component={Login} />
                    <ProtectedRoute path="/profile" component={Profile} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/shops" component={Shops} />
                    <Route path="/search" component={Search} />
                    <Route path="/filter/:filter" component={Filter} />
                    <Route
                        path="/catalog/:category?/:productId?"
                        component={Products}
                    />
                    <Redirect to="/" />
                </Switch>
                <ToastContainer />
            </AppLoader>
            <Footer />
        </div>
    );
}

export default App;
