import React from 'react'
//import Sticky from "wil-react-sticky";
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Info from './components/Info';
import Footer from './components/Footer';
//import Button from "./components/Button";
import Vis1 from "./components/VisWindow/Vis1.js";
import Vis2 from "./components/VisWindow/Vis2.js";

const App = () => {
  return (
      <div className="App" id="App">
          <div className="Navbar">
          <Navbar />
          </div>
        <div className="Box">
          <Header />
          <div className="VisWindow">
          <a id="Visualize"></a>
            <Vis1 />
            <Vis2 />
          </div>
          <br/>
          <center><Info /></center>
          <center><Footer /></center>
        </div>
      </div>
  );
}

export default App;
