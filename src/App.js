import React from 'react'
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Visualize from './Visualize';
import Info from './Info';
import Footer from './components/Footer';
import Button from "./components/Button";
import VisWindow from "./components/VisWindow";
import { Route, Link } from 'react-router-dom';

const App = () => {
  return (
      <div className="App">
              <Navbar />
                <div className="Box">
                  <Header />
                  <Route exact path="/Visualize" components={Visualize} />
                  <Route exact path="/Info" components={Info} />
                  <Button />
                  <VisWindow />
                  <Footer />
                </div>
      </div>
  );
}

export default App;
