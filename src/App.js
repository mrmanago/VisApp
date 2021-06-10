import React from 'react'
//import Sticky from "wil-react-sticky";
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Info from './components/Info';
import Footer from './components/Footer';
import VisWindow from "./components/VisWindow/VisWindow";
//import Horizontal from './components/VisWindow/Horizontal';
import RangeSlider from './components/VisWindow/RangeSlider';
// To include the default styles
import 'react-rangeslider/lib/index.css'

const App = () => {
  return (
      <div className="App" id="App">
          <div className="Navbar">
          <Navbar />
          </div>
        <div className="Box">
          <Header />
          <button>Upload file</button>
          <VisWindow />
          <br/>
          <div className="Slider">
            <RangeSlider />
          </div>
          <center><Info /></center>
          <center><Footer /></center>
        </div>
      </div>
  );
}

export default App;
