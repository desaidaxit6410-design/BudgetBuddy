import React from 'react';
import logo from '../../assets/images/card_1.svg';

export default function Header() {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.5rem 1rem',
      borderBottom: '1px solid #ddd'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <img src={logo} alt="MySpend Logo" style={{ height: '30px' }} />
        <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#004D61' }}>MySpend</span>
      </div>
      <button style={{
        background: '#000',
        color: '#fff',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer'
      }}>
        Get Started
      </button>
    </header>
  );
}