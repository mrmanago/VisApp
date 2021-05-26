import React from 'react'
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import Button from "./components/Button";
import VisWindow from "./components/VisWindow";
import DataLoader from "./components/DataLoader";

const App = () => {
  return (
      <div className="App">
              <Navbar />
                <div className="Box">
                  <center><Header /></center>
                  <VisWindow />
                  <br/>
                  <Footer />
                  <DataLoader />
                </div>
      </div>
  );

}

export default App;
