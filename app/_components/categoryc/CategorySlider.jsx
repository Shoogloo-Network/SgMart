'use client'
import Link from 'next/link'
import {  useRouter } from 'next/navigation';
import React from 'react'
import styles from './CategorySlider.module.css'
const CategorySlider = ({data}) => {
  const router = useRouter();
  const handleClick = (item) => {
    const title = item.title?.split(" ").join("+");
    router.push(`/products?query=${title}`);
  };
  return (
    <div className={styles.categorySliderMainDiv}  >
      {
        data?.map((item , index) => {
            return(
              <div className={`${styles.categorySliderContainer}`} onClick={()=>handleClick(item)} key={index} >
                <img src={item?.img} alt={item?.title}  />
                <h1 className={styles.categorySliderContainerHeading}>{item?.title}</h1>
              </div>
            )
        })
      }
    </div>
  )
}

export default CategorySlider
