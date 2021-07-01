import React from 'react'
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Info from './components/Info';
import Footer from './components/Footer';
import VisWindow from "./components/VisWindow/VisWindow";

const App = () => {
  return (
      <div className="App" id="App">
          <div className="Navbar">
          <Navbar />
          </div>
        <div className="Box">
          <Header />
          <VisWindow />
          <br/>
          <center><Info /></center>
          <center><Footer /></center>
        </div>
      </div>
  );
}

export default App;
