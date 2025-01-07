import React from 'react';
import styles from './Filter.module.css';
interface FilterProps {
    label: string;
    options: { label: string; value: string }[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Filter: React.FC<FilterProps> = ({ label, options, value, onChange }) => {
    const selectId = label.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className={styles.filter}>
            <label htmlFor={selectId}>{label}</label>
            <select id={selectId} value={value} onChange={onChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filter;
