
import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>Footer Section</p>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#282c34',
  color: 'white',
  padding: '10px 0',
  textAlign: 'center',
  position: 'fixed',
  left: '0',
  bottom: '0',
  width: '100%',
};

export default Footer;