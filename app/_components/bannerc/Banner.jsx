import React from 'react'

import {  useRouter } from 'next/navigation';
import styles from './Banner.module.css'

const Banner = ({data}) => {
  const router = useRouter();
  const handleClick = (item) => {
    const title = item.title?.split(" ").join("+");
    router.push(`/products?query=${title}`);
  };
  return (
    <div className={styles.banner}>
    {
        data.map((item) => {
            return( <div  style={{backgroundImage:`url(${item.img})`}} className={styles.bannerMainDiv} key={item.id} onClick={()=>handleClick(item)}>

              </div>);
        })
    }
    </div>
  )
}

export default Banner
