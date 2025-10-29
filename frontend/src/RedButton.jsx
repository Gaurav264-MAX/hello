import React from 'react';

const RedButton = ({ children, onClick, style = {}, ...props }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: '#e53935',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '10px 20px',
        fontWeight: 600,
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background 0.2s',
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default RedButton; 