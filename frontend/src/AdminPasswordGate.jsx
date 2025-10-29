import React, { useState } from 'react';
import ProductTypeEditPanel from './ProductTypeEditPanel';

const ADMIN_PASSWORD = 'admin123'; // Change as needed

const AdminPasswordGate = (props) => {
  const [entered, setEntered] = useState(false);
  const [input, setInput] = useState('');

  if (!entered) {
    return (
      <form onSubmit={e => { e.preventDefault(); if (input === ADMIN_PASSWORD) setEntered(true); else alert('Incorrect password!'); }} style={{ margin: 40 }}>
        <h2>Admin Panel Login</h2>
        <input
          type="password"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter admin password"
        />
        <button type="submit">Enter</button>
      </form>
    );
  }
  return <ProductTypeEditPanel {...props} />;
};

export default AdminPasswordGate; 