"use client";

export const localStorageMiddleware = store => next => action => {
  const result = next(action);
  if (typeof window !== 'undefined' && [
    'cart/addItemToCart', 
    'cart/removeItemFromCart', 
    'cart/increaseQuantity', 
    'cart/decreaseQuantity'
  ].includes(action.type)) {
    const cartState = store.getState().cart;
    localStorage.setItem('cart', JSON.stringify(cartState));
  }
  return result;
};

export const rehydrateCartState = () => {
  if (typeof window !== 'undefined') {
    const cart = localStorage.getItem('cart');
    if (cart) {
      try {
        return JSON.parse(cart);
      } catch (e) {
        console.log("Error parsing cart state from localStorage:", e);
      }
    }
  }
  return undefined;
};
