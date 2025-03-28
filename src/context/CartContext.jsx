// src/context/CartContext.jsx
import { createContext, useState, useContext } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // Використовуємо useState для збереження cartList

 
  const getItemFromLocalStorage = (list) => {
    const storedItems = JSON.parse(localStorage.getItem(list))
    return storedItems
  }

  const [cartList, setCartList] = useState(getItemFromLocalStorage('cart') || []);

  const setItemToLocalStorage = (key, array) => {
    const cartListToString = JSON.stringify(array)
    localStorage.setItem(key, cartListToString)
  }

  

  return (
    <CartContext.Provider value={{ cartList, setCartList, setItemToLocalStorage }}>
      {children}
    </CartContext.Provider>
  );
};

// Хук для доступу до контексту
export const useCart = () => useContext(CartContext);
