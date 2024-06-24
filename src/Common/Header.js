
import React from 'react';

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1>Header Section</h1>
    </header>
  );
};

const headerStyle = {
  backgroundColor: '#282c34',
  color: 'white',
  padding: '10px 0',
  textAlign: 'center',
};

export default Header;