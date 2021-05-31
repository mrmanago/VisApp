import React from 'react'
import Sticky from "wil-react-sticky";
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import Button from "./components/Button";
import VisWindow from "./components/VisWindow";

const App = () => {
  return (
      <div className="App" id="App">
        <Sticky 
        stickyEnableRange={[0, Infinity]}
        containerSelectorFocus="#App">
          <div className="Navbar">
          <Navbar />
          </div>
        </Sticky>
        <div className="Box">
        <center><Header /></center>
        <VisWindow />
        <Footer />
        </div>
      </div>
  );
}

export default App;
