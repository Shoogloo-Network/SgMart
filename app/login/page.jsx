'use client'
import { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

export default function Page() {
  const [isEmailLogin, setIsEmailLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    // Handle email login logic here
    console.log('Email:', email, 'Password:', password);
    setError('');
  };

  const handlePhoneLogin = (e) => {
    e.preventDefault();
    if (!phone || !otp) {
      setError('Please enter both phone number and OTP.');
      return;
    }
    // Handle phone login logic here
    console.log('Phone:', phone, 'OTP:', otp);
    setError('');
  };

  return (
    <div className={styles.container}>
      {/* <h1>Login</h1> */}
      <div className={styles.loginMethods}>
        <button
          onClick={() => setIsEmailLogin(true)}
          className={isEmailLogin ? styles.active : ''}
        >
          Login with Email
        </button>
        <button
          onClick={() => setIsEmailLogin(false)}
          className={!isEmailLogin ? styles.active : ''}
        >
          Login with Phone
        </button>
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {isEmailLogin ? (
        <form onSubmit={handleEmailLogin}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>Login</button>
        </form>
      ) : (
        <form onSubmit={handlePhoneLogin}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Phone Number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className={styles.inputField}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>Login</button>
         
        </form>
      )}
      <div className={styles.loginOption}>
         <p>Don't Have a Account ? </p><span><Link href='/register'>Register Now</Link></span>
         </div>
    </div>
  );
}
