'use client'
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Search from '../_components/searchc/Search';
import styles from './Header.module.css';
import Link from 'next/link';

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenu , setSubMenu] = useState(false);
  useEffect(() => {
    setCartCount(cart.items.length);
  }, [cart]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        {
       !menuOpen  && <Link href='/'>
          <img src='/images/astro369logo1.png' alt='Logo' className={styles.logo} />
        </Link>
        }
      {
       !menuOpen && <div className={styles.hamburger} onClick={toggleMenu}>
          <img src='/images/hamburger.png' alt='Menu' />
        </div>
        }
        <div className={`${styles.rightContainerDiv} ${menuOpen ? styles.showMenu : ''}`}>
        <div style={{display:'flex' , flexDirection:'row-reverse',justifyContent:'space-between' }}>
       {
         menuOpen&&<p  onClick={toggleMenu} style={{fontWeight:'bold', float:'right'}}>X</p>
       }
        <Search />
        </div>
         <div className={styles.cartContainer}>
         <Link href='/'>
            <img src='/images/wishList.png' alt='Wish List' className={styles.addCart} height={40} width={40} />
          </Link>
          <Link href='/cart'>
            <div className={styles.cartNotification}>
              <img src='/images/addToCart.png' alt='Add to cart' className={styles.addCart} height={40} width={40} />
              <span className={styles.cartCount}>{cartCount}</span>
            </div>
          </Link>
          <Link href='#' onMouseEnter={()=>{setSubMenu(true)}} onMouseLeave={()=>{setSubMenu(false)}}>
            <img src='/images/user.png' alt='User' className={styles.addCart} height={40} width={40} />
          </Link>
         </div>
        </div>
      </div>
      {
      subMenu && <div className={styles.subMenu}  onMouseEnter={()=>{setSubMenu(true)}} onMouseLeave={()=>{setSubMenu(false)}}>
        <ul>
        <Link href='/login'><li>Login/Register</li></Link>
          <li>My Acount</li>
         <Link href='/my-orders'> <li>My Orders</li></Link>
          <li>LogOut</li>
        </ul>
         </div>
         }
    </div>
  );
};

export default Header;
