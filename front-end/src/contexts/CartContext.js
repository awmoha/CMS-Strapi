import React, { useState, createContext } from "react";

export const CartContext = createContext();
const STORAGE_ITEM = "TOOLBOX";
export const CartProvider = ({ children }) => {
  const initialItems = JSON.parse(localStorage.getItem(STORAGE_ITEM)) || [];
  const calculateCartTotal = (items) => {
    localStorage.setItem(STORAGE_ITEM, JSON.stringify(items));
    const itemsCount = items.reduce((prev, curr) => prev + curr.qty, 0);

    const cartTotal = items.reduce(
      (prev, curr) => prev + curr.qty * curr.attributes.price,
      0
    );
    return { itemsCount, cartTotal };
  };
  const [cart, setcart] = useState({
    items: initialItems,
    ...calculateCartTotal(initialItems),
  });

  const setCart = (newCart) => {
    setcart(newCart);
  };

  // om man ska ändra itemsCout
  // const setCartCount = (count) => {
  //   setcart((prevState) => ({
  //     ...prevState,
  //     itemsCount: count,
  //   }));
  // };

  // const setCartItems = (items) => {
  //   setcart((prevState) => ({
  //     ...prevState,
  //     items,
  //   }));
  // };

  const addToCart = (product) => {
    const { items = [] } = cart;
    const productIndex = items.findIndex((item) => item.id === product.id);
    if (productIndex === -1) {
      items.push({ ...product, qty: 1 });
    } else {
      items[productIndex].qty++;
    }
    const total = calculateCartTotal(items);
    setcart({ items, ...total });
  };
  const removeToCart = (product) => {
    const { items = [] } = cart;
    const productIndex = items.findIndex((item) => item.id === product.id);
    if (productIndex !== -1) {
      items.splice(productIndex, 1);
    }
    const total = calculateCartTotal(items);
    setcart({ items, ...total });
  };
  return (
    <CartContext.Provider value={{ cart, addToCart, removeToCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
