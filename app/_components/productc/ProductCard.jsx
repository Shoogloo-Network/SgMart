'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import styles from './ProductCard.module.css'
const ProductCard = ({data}) => {
    const router = useRouter();
    const handleCardClick = (item) => {
        // Ensure you are passing the correct type of data in the query parameter
        if (!item.title) {
          console.error("Item title is missing");
          return;
        }
        
    
        router.push(`/products/${String(item.title)}?id=${String(item.id)}`);
      };
  return (
    <div className={styles.container}>
    {data.map((item, index) => {
      if (item.id > 4) return null;
      return (
        <div key={index} className={styles.card} onClick={() => handleCardClick(item)}>
          <div>
            <img src={item.img} alt={item.title} />
          </div>
          <div className={styles.cardHeading}>
            <p>{item.type}</p>
            <h1>{item.title}</h1>
            <div className={styles.cardPricing}>
            <span className={styles.disPrice}>₹{item.disPrice}</span>
              <span className={styles.price}>₹{item.price}</span>
             
             
              <span className={styles.percentageOff}>{item.percentageOff} Off</span>
            </div>
          </div>
          <div className={styles.colorCode}>
            <div style={{ backgroundColor: `${item?.colorCode}` }}></div>
            <p>{item.colorText}</p>
          </div>
        </div>
      );
    })}
  </div>
  )
}

export default ProductCard
