import { useState } from "react";
import PropTypes from "prop-types";
import "./DropdownFilter.css";
import arrow from "../../assets/icons/arrow-downlist.svg";

export default function DropdownFilter({
  label,
  options,
  onSelect,
  selectedOption,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-filter">
      <span className="dropdown-label">{label}</span>
      <div className="dropdown" onClick={() => setIsOpen(!isOpen)}>
        <span className="dropdown-selected">{selectedOption}</span>
        {typeof label === "string" && <img src={arrow} alt="arrow-down" />}
        {isOpen && (
          <ul className="dropdown-options">
            {options.map((option, index) => (
              <li
                key={index}
                className="dropdown-option"
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

DropdownFilter.propTypes = {
  label: PropTypes.node.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedOption: PropTypes.string.isRequired,
};
