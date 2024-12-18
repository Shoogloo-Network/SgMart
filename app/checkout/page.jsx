'use client'
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart } from '../redux/cartSlice';
import styles from './page.module.css';
import CheckOutForm from '../_components/forms/checkoutform/CheckOutForm';

const Page = () => {
  const query = useSearchParams();
  const searchParams = query ? query.get('data') : null;
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(items);
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
  <CheckOutForm onClick={handleProceedToPayment} data={cartItem}/>
  );
};

export default Page;




















































{/* <div className={styles.container}>
<div className={styles.product}>
  <img src={item.img} alt={item.title} className={styles.image} />
  <div className={styles.details}>
    <h1 className={styles.title}>{item.title || 'No Title'}</h1>
    <p className={styles.price}>Price: {itemPrice || 'N/A'} {item.currency}</p>
    <p className={styles.description}>{item.description || 'No Description'}</p>
    <p className={styles.category}>Category: {item.category || 'No Category'}</p>
    <p className={styles.brand}>Brand: {item.brand || 'No Brand'}</p>
    <p className={styles.sizes}>Sizes: {item.size ? item.size.join(', ') : 'No Sizes'}</p>
    <p className={styles.colors}>Colors: {item.color ? item.color.join(', ') : 'No Colors'}</p>
    <p className={styles.rating}>Rating: {item.rating || 'No Rating'}</p>
    <p className={styles.stock}>Stock: {item.stock || 'No Stock'}</p>
  </div>
</div>
<button className={styles.proceedButton} onClick={handleProceedToPayment}>Proceed to Payment</button>
<div className={styles.reviews}>
  <h2>Reviews:</h2>
  {item.reviews ? item.reviews.map((review, index) => (
    <div key={index} className={styles.review}>
      <p><strong>{review.user}</strong>: {review.comment} ({review.rating} stars)</p>
    </div>
  )) : <p>No Reviews</p>}
</div>
</div> */}