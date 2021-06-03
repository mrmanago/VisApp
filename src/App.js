import React from 'react'
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import Button from "./components/Button";
import VisWindow from "./components/VisWindow";
import DataLoader from "./components/DataLoader";
// import * as d3 from "d3";

const App = () => {
  return (
      <div className="App">
        <DataLoader />
        <Navbar />
        <div className="Box">
          <VisWindow />
          <center><Header /></center>
          <br/>
          <Footer />
        </div>
      </div>
  );

}

export default App;
