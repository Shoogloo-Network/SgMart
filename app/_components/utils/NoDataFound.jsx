import React from 'react';
import styles from './NoDataFound.module.css';
import { useRouter } from 'next/navigation';
const NoDataFound = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>No Data Found</h1>
      <p className={styles.p}>Sorry, we couldn't find any results for your search.</p>
      <img src="/images/404_page-not-found.png" alt="No Data" className={styles.image}  />
      <button className={styles.button} onClick={() => router.push('/')}>Try Again</button>
    </div>
  );
};

export default NoDataFound;
