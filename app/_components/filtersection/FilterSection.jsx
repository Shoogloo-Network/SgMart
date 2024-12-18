import React from 'react';
import styles from './FilterSection.module.css';

const FilterSection = ({ filters, onFilterChange }) => {
  return (
    <div className={styles.filterSection}>
      {filters.map(filter => (
        <div key={filter.id} className={styles.filterItem}>
          <label>
            <input
              type="checkbox"
              checked={filter.checked}
              onChange={() => onFilterChange(filter.id)}
            />
            {filter.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default FilterSection;
