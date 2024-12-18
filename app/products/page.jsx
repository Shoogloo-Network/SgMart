'use client';  // To ensure client-side rendering
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams from next/navigation
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Spinner from '../_components/spinnerc/Spinner';
import NoDataFound from '../_components/utils/NoDataFound';
import FilterSection from '../_components/filtersection/FilterSection'; // Import the FilterSection component

const Page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query'); // Get the query parameter from the URL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState([
    { id: 1, label: 'Mens T-shirt', checked: false },
    { id: 2, label: 'Womens Jeans', checked: false },
    { id: 3, label: 'top', checked: false },
    { id: 4, label: 'Women T-shirt', checked: false },
    { id: 5, label: 'Men Jeans', checked: false },
    { id: 6, label: 'Crop Top', checked: false },
    { id: 7, label: 'Mens Shirt', checked: false },
    { id: 8, label: 'Jeans', checked: false },
    { id: 9, label: 'Shirt', checked: false },
  ]);

  const router = useRouter();

  useEffect(() => {
    if (query) {
      const url = `http://localhost:8080/productcard`;

      // Fetch data from the external API
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [query]); // Dependency on query

  const handleClick = (item) => {
    // Ensure you are passing the correct type of data in the query parameter
    if (!item.title) {
      console.error("Item title is missing");
      return;
    }
    router.push(`/products/${String(item.title)}?id=${String(item.id)}`);
  };

  const handleFilterChange = (id) => {
    setFilters(filters.map(filter =>
      filter.id === id ? { ...filter, checked: !filter.checked } : filter
    ));
  };

  if (loading) {
    return <div><Spinner /></div>;
  }

  if (!query || !data) {
    console.error("Query or data is missing");
    return [];
  }

  const activeFilters = filters.filter(filter => filter.checked).map(filter => filter.label.toLowerCase());

  const filteredData = data.filter(item => {
    const lowerCaseTitle = item.title.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();
    const matchesQuery = lowerCaseTitle.includes(lowerCaseQuery);
    const matchesFilters = activeFilters.length === 0 || activeFilters.some(filter => 
      lowerCaseTitle.replace(/\s/g, '').includes(filter.replace(/\s/g, '').slice(0, 3))
    );
    return matchesQuery && matchesFilters;
  });

  console.log(filteredData);

  return (
    <div className={styles.containerMain}>
      <div className={styles.leftContainer}>
        <h1 className={styles.h1}>Filter Products</h1>
        <FilterSection filters={filters} onFilterChange={handleFilterChange} />
      </div>

      <div className={styles.rightContainer}>
        <h1 className={styles.h1}>Results for {query}</h1>
        {filteredData.length !== 0 ? (
          <div className={styles.container}>
            {filteredData.map((item, index) => (
              <div key={index} className={styles.card} onClick={() => handleClick(item)}>
                <div>
                  <img src={item.img} alt={item.title} />
                </div>
                <div className={styles.cardHeading}>
                  <p>{item.type}</p>
                  <h1>{item.title}</h1>
                  <div style={{ display: 'none' }}>
                    <span>{item.price}</span>
                    <span>{item.disPrice}</span>
                    <span>{item.percentageOff}</span>
                  </div>
                </div>
                <div style={{ display: 'none' }}>
                  <div style={{ backgroundColor: `${item?.colorCode}` }}></div>
                  <p>{item.colorText}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div><NoDataFound /></div>
        )}
      </div>
    </div>
  );
};

export default Page;
