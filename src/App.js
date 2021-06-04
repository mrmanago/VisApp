import React from 'react'
import Sticky from "wil-react-sticky";
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Vis1 from "./components/VisWindow/Vis1.js";
import Vis2 from "./components/VisWindow/Vis2.js";

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
          <div className="VisWindow">
            <Vis1 />
            <Vis2 />
          </div>
          <br/>
          <Footer />
        </div>
      </div>
  );
}

export default App;
