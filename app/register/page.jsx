'use client'
// pages/register.js
import { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

export default function Page() {
  const [isEmailRegister, setIsEmailRegister] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');

  const handleEmailRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !address || !dob) {
      setError('Please fill in all fields.');
      return;
    }
    // Handle email registration logic here
    console.log('Name:', name, 'Email:', email, 'Password:', password, 'Address:', address, 'DOB:', dob);
    setError('');
  };

  const handlePhoneRegister = (e) => {
    e.preventDefault();
    if (!name || !phone || !otp || !address || !dob) {
      setError('Please fill in all fields.');
      return;
    }
    // Handle phone registration logic here
    console.log('Name:', name, 'Phone:', phone, 'OTP:', otp, 'Address:', address, 'DOB:', dob);
    setError('');
  };

  return (
    <div className={styles.container}>
   
      <div className={styles.registerMethods}>
        <button
          onClick={() => setIsEmailRegister(true)}
          className={isEmailRegister ? styles.active : ''}
        >
          Register with Email
        </button>
        <button
          onClick={() => setIsEmailRegister(false)}
          className={!isEmailRegister ? styles.active : ''}
        >
          Register with Phone
        </button>
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {isEmailRegister ? (
        <form onSubmit={handleEmailRegister}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.inputField}
              required
            />
          </div>
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
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={styles.inputField}
              required
            />
          </div>
          {/* <div className={styles.formGroup}>
            <label className={styles.formLabel}>Date of Birth:</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className={styles.inputField}
              required
            />
          </div> */}
          <button type="submit" className={styles.submitButton}>Register</button>
        </form>
      ) : (
        <form onSubmit={handlePhoneRegister}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.inputField}
              required
            />
          </div>
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
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={styles.inputField}
              required
            />
          </div>
          {/* <div className={styles.formGroup}>
            <label className={styles.formLabel}>Date of Birth:</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className={styles.inputField}
              required
            />
          </div> */}
          <button type="submit" className={styles.submitButton}>Register</button>
        </form>
      )}
       <div className={styles.loginOption}>
         <p>Already Have a Account ? </p><span><Link href='/login'>Login Now</Link></span>
         </div>
    </div>
  );
}
