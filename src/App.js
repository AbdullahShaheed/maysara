import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Products from "./components/products";
import ProductForm from "./components/productForm";
import NavBar from "./components/navbar";
import Customers from "./components/customers";
import CustomerForm from "./components/customerForm";
import Orders from "./components/orders";
import OrderForm from "./components/orderForm";
import OrderPreviewForm from "./components/orderPreviewForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import NotFound from "./components/notFound";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <ToastContainer />
        <header>
          <NavBar />
        </header>
        <main className="container">
          <Switch>
            <Route path="/products/:id" component={ProductForm} />
            <Route path="/products" component={Products} />
            <Route path="/customers/:id" component={CustomerForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/orders/preview/:id" component={OrderPreviewForm} />
            <Route path="/orders/:id" component={OrderForm} />
            <Route path="/orders" component={Orders} />
            <Route path="/login" component={LoginForm} />
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
