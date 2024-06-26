import React from 'react';

const Header = ({ onNavButtonClick }) => {
  return (
    <header style={headerStyle}>
      <nav style={styles.nav}>
        <button onClick={() => onNavButtonClick('main')} style={styles.navButton}>
          Main
        </button>
        <button onClick={() => onNavButtonClick('sales')} style={styles.navButton}>
          Sales List
        </button>
        <button onClick={() => onNavButtonClick('customers')} style={styles.navButton}>
          Customer List
        </button>
      </nav>
    </header>
  );
};

const headerStyle = {
  backgroundColor: '#282c34', // Same background color as the overall theme
  color: '#fff', // Text color set to white
  padding: '10px 0', // Padding adjusted to match the theme's header style
  textAlign: 'center',
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
    backgroundColor: '#282c34', // Background color for the navigation
    borderBottom: '1px solid #ddd',
  },
  navButton: {
    margin: '0 10px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
export default Header;
