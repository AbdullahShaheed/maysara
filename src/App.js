import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";
import Products from "./components/products";
import ProductForm from "./components/productForm";
import NavBar from "./components/navbar";
import Customers from "./components/customers";
import CustomerForm from "./components/customerForm";
import Orders from "./components/orders";
import OrderForm from "./components/orderForm";
import OrderPreviewForm from "./components/orderPreviewForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import Profile from "./components/profile";
import RegisterForm from "./components/registerForm";
import NotFound from "./components/notFound";
import ProtectedRoute from "./components/common/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <>
        <ToastContainer />
        <header>
          <NavBar user={user} />
        </header>
        <main className="container">
          <Switch>
            <ProtectedRoute path="/products/:id" component={ProductForm} />
            <Route path="/products" component={Products} />} />
            <Route path="/customers/:id" component={CustomerForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/orders/preview/:id" component={OrderPreviewForm} />
            <ProtectedRoute path="/orders/:id" component={OrderForm} />
            <Route path="/orders" component={Orders} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/profile" component={Profile} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/products" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
        <hr />
        <footer>
          <p style={{ textAlign: "center", paddingBottom: 20 }}>2020 &copy;</p>
        </footer>
      </>
    );
  }
}

export default App;
