// src/redux/store.js
'use client'
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import { localStorageMiddleware, rehydrateCartState } from './localStorageMiddleware';

const preloadedState = {
  cart: rehydrateCartState(),
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState,
});
