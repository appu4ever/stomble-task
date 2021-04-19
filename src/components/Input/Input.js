import React from 'react';

export default function Input({
  name,
  onChange,
  value,
  errors,
  children,
  handleBlur,
  handleInputDelete,
  divStyle = {},
  ...otherProps
}) {
  return (
    <div className="form-input" style={divStyle}>
      <label>{children}</label>
      {otherProps.readOnly ? (
        <input type="text" value={value} {...otherProps} />
      ) : (
        <>
          <input
            name={name}
            onChange={onChange}
            value={value}
            required
            onBlur={handleBlur}
            onKeyUpCapture={handleInputDelete}
            {...otherProps}
          />
          <div className="form-error-message">{errors[name].text}</div>
        </>
      )}
    </div>
  );
}
