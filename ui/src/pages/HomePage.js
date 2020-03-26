import React from 'react';
import NavBar from './NavBar';
import QRCode from 'react-qr-code';

const HomePage = () => (
  <div className="App">
    <NavBar />
      <QRCode value="hey" />
    <h1>HomePage</h1>

  </div>
);

export default HomePage;
