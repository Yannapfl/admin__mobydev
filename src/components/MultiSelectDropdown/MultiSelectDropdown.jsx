import PropTypes from "prop-types";
import { useState } from "react";
import './MultiSelectDropdown.css'

export default function MultiSelectDropdown({ placeholder, options, selectedValues, setSelectedValues }) {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => setIsOpen(!isOpen);
  
    const handleCheckboxChange = (option) => {
      setSelectedValues(
        selectedValues.includes(option)
          ? selectedValues.filter((item) => item !== option)
          : [...selectedValues, option]
      );
    };
  
    return (
      <div className="multi-select-dropdown">
        <div className="input-wrapper-main-info" >
          <input
            type="text"
            value={selectedValues.length !== 0 ? selectedValues.join(", ") : []}
            placeholder={placeholder}
            className={`input-main-info ${selectedValues.length === 0 ? "" : "filled" }`}
            readOnly  
          />
          <button type="button" className="btn-img btn-arrow-multidropdown" onClick={toggleDropdown}>
            {isOpen ? "⏶" : "⏷"}
          </button>
        </div>
        {isOpen && (
          <ul className="multidropdown-list m-0">
            {options.map((option) => (
              <li 
                key={option} 
                className={`multidropdow-list-item ${selectedValues.includes(option) ? 'active' : ''}`}
                onClick={() => handleCheckboxChange(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
                    {selectedValues.length !== 0 && (
                <p className="input-label-projects">
                    {placeholder}
                </p>
            )}
      </div>
    );
  }
  
  MultiSelectDropdown.propTypes = {
    placeholder: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedValues: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelectedValues: PropTypes.func.isRequired,
  };