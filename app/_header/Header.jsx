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
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    setCartCount(cart.items.length);
  }, [cart]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const toggleSubmenu = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
      {
       <div className={styles.hamburger} onClick={toggleMenu}>
          <img src='/images/hamburger.png' alt='Menu' />
        </div>
        }
        {
  <Link href='/'>
          <img src='/images/astro369logo1.png' alt='Logo' className={styles.logo} />
        </Link>
        }
    
        <div className={`${styles.rightContainerDiv} `}>
        <div style={{display:'flex' , flexDirection:'row-reverse',justifyContent:'space-between' }}>
       
        <Search />
        </div>
         <div className={styles.cartContainer}>
        {  <Link href='/'>
            <img src='/images/wishList.png' alt='Wish List' className={`${styles.addCart} ${styles.wishList}` } height={40} width={40} />
          </Link>}
          <Link href='/cart'>
            <div className={styles.cartNotification}>
              <img src='/images/addToCart.png' alt='Add to cart' className={styles.addCart} height={40} width={40} />
              <span className={styles.cartCount}>{cartCount}</span>
            </div>
          </Link>
          <Link href='#' onClick={()=>{setSubMenu(!subMenu);}}>
            <img src='/images/user.png' alt='User' className={styles.addCart} height={40} width={40} />
          </Link>
          
         </div>
        </div>
      </div>
      {
     ( subMenu) && <div className={styles.subMenu}  onMouseEnter={()=>{setSubMenu(true)}} onMouseLeave={()=>{setSubMenu(false)}}>
        <ul>
        <Link href='/login'><li>Login/Register</li></Link>
          <li>My Acount</li>
         <Link href='/my-orders'> <li>My Orders</li></Link>
          <li>LogOut</li>
        </ul>
         </div>
         }

{menuOpen  && (
        <div className={styles.menu}>
          <div className={styles.menuItem} onClick={() => toggleSubmenu('men')}>
            <p>Men </p><p className={styles.arrow}>{activeCategory === 'men' ? '>' : 'v'}</p>
          </div>
          {activeCategory === 'men' && (
            <div className={styles.submenu}>
              <a href="#men-shirts">Shirts</a>
              <a href="#men-pants">Pants</a>
              <a href="#men-shoes">Shoes</a>
            </div>
          )}
          <div className={styles.menuItem} onClick={() => toggleSubmenu('women')}>
           <p> Women</p> <p className={styles.arrow}>{activeCategory === 'women' ? '>' : 'v'}</p>
          </div>
          {activeCategory === 'women' && (
            <div className={styles.submenu}>
              <a href="#women-dresses">Dresses</a>
              <a href="#women-tops">Tops</a>
              <a href="#women-shoes">Shoes</a>
            </div>
          )}
          <div className={styles.menuItem} onClick={() => toggleSubmenu('kids')}>
           <p> Kids</p> <p className={styles.arrow}>{activeCategory === 'kids' ? '>' : 'v'}</p>
          </div>
          {activeCategory === 'kids' && (
            <div className={styles.submenu}>
              <a href="#kids-boys">Boys</a>
              <a href="#kids-girls">Girls</a>
              <a href="#kids-shoes">Shoes</a>
            </div>
          )}
          <div className={styles.menuItem} onClick={() => toggleSubmenu('sale')}>
           <p>Sale</p>  <p className={styles.arrow}>{activeCategory === 'sale' ? '>' : 'v'}</p>
          </div>
          {activeCategory === 'sale' && (
            <div className={styles.submenu}>
              <a href="#sale-men">Men</a>
              <a href="#sale-women">Women</a>
              <a href="#sale-kids">Kids</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
