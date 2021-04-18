import React from 'react';

export default function Select({
  onChange,
  value,
  name,
  defaultText,
  optionArray,
}) {
  return (
    <select onChange={onChange} value={value} name={name} required>
      <option name="" value="" disabled hidden>
        {defaultText}
      </option>
      {optionArray.map((option) => (
        <option name={option} value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
