import React, { useState } from 'react';
import Header from './Common/Header';
import Footer from './Common/Footer';
import Landing from './Main/Landing';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [activeView, setActiveView] = useState('main');

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  return (
    <div style={appStyle}>
      <Header onNavButtonClick={handleViewChange} />
      <main style={mainStyle}>
        <Landing activeView={activeView} />
      </main>
      <br></br>
      <br></br>
      {/* <Footer /> */}
      <ToastContainer />
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

export default App;
