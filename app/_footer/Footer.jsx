// components/Footer.js
'use client'
import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h4>About Us</h4>
          <p>Learn more about our brand and values.</p>
        </div>
        <div className={styles.column}>
          <h4>Customer Service</h4>
          <ul className={styles.list}>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/returns">Returns</Link></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Follow Us</h4>
          <ul className={styles.list}>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© 2024 Your Brand. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
