import React from 'react';
import Input from './Input';

export default function Datalist({
  children,
  handleBlur,
  handleChange,
  handleInputDelete,
  formErrors,
  value,
  optionArray,
  name,
}) {
  console.log('Form', formErrors);
  return (
    <div>
      <Input
        name={name}
        onChange={handleChange}
        value={value}
        errors={formErrors}
        handleBlur={handleBlur}
        handleInputDelete={handleInputDelete}
      >
        {children}
      </Input>
      <datalist>
        {optionArray.map((option) => (
          <option
            name={option.cardNumber}
            value={option.cardNumber}
            key={option.cardNumber}
          >
            {option.cardNumber}
          </option>
        ))}
      </datalist>
    </div>
  );
}
