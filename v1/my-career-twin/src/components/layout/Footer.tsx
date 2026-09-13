import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <span>
        &copy; <span id="year">{currentYear}</span> Prasanna Raja
      </span>
      <span className="built">Malta</span>
    </footer>
  );
};

