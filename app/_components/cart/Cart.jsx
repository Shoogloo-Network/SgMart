'use client'
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart, increaseQuantity, decreaseQuantity } from '../../redux/cartSlice';
import {  useRouter } from 'next/navigation';
import styles from './Cart.module.css';
import { useEffect } from 'react';


const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const dispatch = useDispatch();
  const router = useRouter();
  let item = {};
  try {
    item = searchParams ? JSON.parse(searchParams) : {};
  } catch (error) {
    console.log("Failed to parse query parameter:", error);
  }
  // Find the item in the cart
  const cartItem = items.find(cartItem => cartItem.id === item.id);
  const itemPrice = cartItem ? cartItem.price * cartItem.quantity : item.price;
  const handleProceedToPayment = () => {
    // Save order to local storage
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    orderHistory.push({ ...item, quantity: cartItem ? cartItem.quantity : 1 });
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    // Clear cart
    dispatch(removeItemFromCart({ id: item.id }))
    // Redirect to thank you page
    router.push('/orderplaced');
  };

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartHeader}>Shopping Cart</h2>
      { 
      items?.length === 0 ? (<p>Your cart is empty</p>) : (
        <>
          { items.map(item => (
            <div key={item.id} className={styles.cartItem} >
              <div><img src={item.img} alt={item.title} /></div>
              <div className={styles.cartItemDetailsAction}>
                <div className={styles.cartItemDetails}>
                  <h3>{item.title}</h3>
                  <p>{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className={styles.cartItemActions}>
                <button onClick={() => dispatch(increaseQuantity({ id: item.id }))}>+</button>
                <button onClick={() => dispatch(decreaseQuantity({ id: item.id }))}>-</button>
                <button onClick={() => dispatch(removeItemFromCart({ id: item.id }))}>Remove</button>
              </div>
            </div>

          ))}

          <h3 className={styles.totalPrice}>Total Price: ₹{totalPrice?.toFixed(2)}</h3>
          <button className={styles.proceedButton} onClick={handleProceedToPayment}>Proceed to Payment</button>
        </>
      )}
    </div>
  );
};

export default Cart;
