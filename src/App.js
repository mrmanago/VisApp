import React from 'react'
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Info from './components/Info';
import Footer from './components/Footer';
import VisWindow from "./components/VisWindow/VisWindow";
import SummaryNode from "./components/VisWindow/SummaryNode";
import VisWindow2 from "./components/VisWindow/VisWindow2";

const App = () => {
  return (
      <div className="App" id="App">
          <div className="Navbar">
          <Navbar />
          </div>
        <div className="Box">
          <Header />
          <VisWindow />
          <div className="Slider">
          </div>
          <VisWindow2 />
          <br/>
          <center><Info /></center>
          <center><Footer /></center>
        </div>
      </div>
  );
}

export default App;
