import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import debounce from 'lodash/debounce';
import styles from './Search.module.css';
const Search = () => {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // Debounced version of the API call
  const fetchData = debounce(async (query) => {
    if (query) {
      setLoading(true);
      const response = await fetch('http://localhost:8080/productcard');
      const data = await response.json();
      setData(
        data.filter((item) => {
            const itemTitle = item.title.toLowerCase();
            const queryChars = query.toLowerCase().split('');
            return queryChars.every(char => itemTitle.includes(char));
          })
      );
      setLoading(false);
    } else {
      setData([]);
    }
  }, 500); // Adjust the debounce delay as needed

  const onChange = (e) => {
    const query = e.target.value;
    setValue(query);
    fetchData(query);
  };

  return (
    <div className={styles.searchBar}>
    <div className={styles.inputContainer}>
      <input
        type="text"
        onChange={onChange}
        value={value}
        placeholder="Search for products"
        className={styles.input}
      />
      <Link  href={value ? { pathname: '/products', query: { query: value } } : ""} >
        <button className={styles.button} onClick={()=>{setValue("")}}>Search</button>
      </Link>
    </div>
    <div className={styles.results}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        value &&
        data.slice(0, 5).map((item) => (
          <div key={item.id} onClick={() => setValue(item.title)} className={styles.resultItem}>
            {item.title}
            <hr />
          </div>
        ))
      )}
    </div>
  </div>
);
};

export default Search;
