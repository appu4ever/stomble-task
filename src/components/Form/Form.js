import React from 'react';
import './form.css';

export default function Form({ children, onSubmit, isFormValid }) {
  return (
    <form id="form-container" className="card" onSubmit={onSubmit}>
      {children}
      <div style={{ textAlign: 'center' }}>
        <input type="submit" value="Submit" disabled={!isFormValid} />
      </div>
    </form>
  );
}
