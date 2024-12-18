'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './Page.module.css';

const Page = () => {
  const router = useRouter();

  const handleBackToShop = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Thank You!</h1>
      <p className={styles.p}>Your order has been placed successfully.</p>
      <button onClick={handleBackToShop} className={styles.backButton}>Back to Shop</button>
    </div>
  );
};

export default Page;
