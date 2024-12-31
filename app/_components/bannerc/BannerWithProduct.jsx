'use client'
import React from 'react'
import styles from './BannerWithProduct.module.css'
import {  useRouter } from 'next/navigation';
const BannerWithProduct = () => {
  const router = useRouter();
  const handleClick = (item) => {
    const title = item.title?.split(" ").join("+");
    router.push(`/products?query=${title}`);
  };
  return (
    <div className={styles.container} onClick={()=>handleClick({title:"Women"})}>
     <div className={styles.productHeadingDiv}>
        </div> 
        <div className={styles.productCard}>
            <div onClick={(e)=>{e.stopPropagation();
              handleClick({title:"Men jeans"})}}><img src='/images/bannerwithcardproduct2.jpg' alt='bannerProduct'/><p>Shop Men's Tea</p></div>
            <div onClick={(e)=>{e.stopPropagation();
              handleClick({title:"Men jeans"})}}><img src='/images/bannerwithcardproduct3.jpg' alt='bannerProduct1'/><p>Shop Men's Tea</p></div>
            <div onClick={(e)=>{e.stopPropagation();
              handleClick({title:"Men jeans"})}}><img src='/images/bannerwithcardproduct4.jpg' alt='bannerProduct2'/><p>Shop Men's Tea</p></div>
        </div>
    </div>
  )
}

export default BannerWithProduct
