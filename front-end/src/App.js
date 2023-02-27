import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseLine from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import React, { useState, useEffect } from "react";
import { fetchProducts } from "./servis/api";
import Home from "./pages/Home";
import NavBar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import MyAccount from "./pages/myAccount";
import Cart from "./pages/Cart";
import { CartProvider } from "./contexts/CartContext";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";

const useStyles = makeStyles({
  root: {
    padding: 20,
  },
});

function App() {
  const classes = useStyles();

  return (
    <CartProvider>
      <Router>
        <CssBaseLine />
        <NavBar />
        <Container className={classes.root}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders/:id" element={<Order />} />

            
          </Routes>
        </Container>
      </Router>
      </CartProvider>
  );
}

export default App;
