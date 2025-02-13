import { useState } from 'react'
import './NumericStepperInput.css'
import PropTypes from 'prop-types';

export default function NumericStepperInput({ placeholder, selectedValue, setSelectedValue }) {
    const [value, setValue ] = useState(selectedValue || '');
    const [hasError, setHasError] = useState(false);

    const handleInputChange = (e) => {
        const newValue = e.target.value;

        if (/^\d*$/.test(newValue)) {
            setHasError(false);
            const rightValue = newValue === '' ? 0 : parseInt(newValue, 10);
            setValue(rightValue);
            setSelectedValue(rightValue);
        } else {
            setHasError(true);
        }
    };

    const increase = () => {
        setHasError(false);
        const newValue = value + 1;
        setValue(newValue);
        setSelectedValue(newValue);
    };

    const decrease = () => {
        setHasError(false);
        if (value > 1) {
            const newValue = value - 1;
            setValue(newValue);
            setSelectedValue(newValue);
        } else {
            alert('Значение не может быть меньше или равно 0');
        }
    };
    
    return (
        <div className="input-wrapper-main-info">
            <input
                type='text'
                value={value ?? ''}
                placeholder={placeholder}
                onChange={handleInputChange}
                className={` ${hasError ? 'input-error' : 'input-main-info'} ${selectedValue === null ? '' : 'filled'}`}
            />
            <button type='button' className="btn-img btn-arrow-multidropdown btn-increase" onClick={increase}>⏶</button>
            <button type='button' className="btn-img btn-arrow-multidropdown btn-decrease" onClick={decrease}>⏷</button>
            {selectedValue > 0 && (
                <p className="input-label-projects">
                    {placeholder}
                </p>
            )}
        </div>
    )
}

NumericStepperInput.propTypes = {
    placeholder: PropTypes.string,
    selectedValue: PropTypes.number,
    setSelectedValue: PropTypes.func.isRequired,
};