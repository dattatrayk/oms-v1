import React, { useState } from 'react';
import Header from './Common/Header';
import Footer from './Common/Footer';
import Landing from './Main/Landing';

const App = () => {
  

  return (
    <div style={appStyle}>
      <Header />
      <main style={mainStyle}>
        <Landing />
      </main>
      <br></br>
      <br></br>
      {/* <Footer /> */}
    </div>
  );
};

const appStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const mainStyle = {
  flex: '1',
  padding: '20px',
  textAlign: 'center',
};

const itemsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const cartStyle = {
  marginTop: '20px',
  textAlign: 'left',
};

const buttonStyle = {
  marginTop: '10px',
  padding: '5px 10px',
};

export default App;
