import React from 'react';

export default function DateSection({ children }) {
  return (
    <div id="date-container">
      <span>Expiration Date</span>
      <div id="select-container">{children}</div>
    </div>
  );
}
