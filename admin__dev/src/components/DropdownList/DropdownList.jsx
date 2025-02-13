import PropTypes from "prop-types";
import { useState } from "react";
import './DropdownList.css'

export default function DropdownList({ options, selectedValue, setSelectedValue, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="select-dropdown">
      <input
        type="text"
        value={selectedValue}
        placeholder={placeholder}
        className={`input-main-info ${selectedValue ? "filled" : ""}`}
        readOnly
      />
      <button
        type="button"
        className="btn-img btn-arrow-dropdown"
        onClick={toggleDropdown}
      >
        {isOpen ? "⏶" : "⏷"}
      </button>
      {isOpen && (
        <ul className="dropdown-list m-0">
          {options.map((option) => (
            <li
              key={String(option)}
              className={`dropdow-list-item ${
                selectedValue === option ? "active" : ""
              }`}
              onClick={() => {
                setSelectedValue(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      {selectedValue && <p className="input-label-projects">{placeholder}</p>}
    </div>
  );
}

DropdownList.propTypes = {
  options: PropTypes.arrayOf(PropTypes.any),
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setSelectedValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

