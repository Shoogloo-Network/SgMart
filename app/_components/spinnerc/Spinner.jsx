// Spinner.js
'use client'
import React from 'react';
import './Spinner.css'; // Import the CSS file for styling

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container"></div>
    </div>
  );
};

export default Spinner;
