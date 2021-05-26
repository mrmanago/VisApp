import React from 'react'
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Button from "./components/Button";
import VisWindow from "./components/VisWindow";

const App = () => {
  return (
      <div className="App">
              <Navbar />
                <div className="Box">
                  <Header />
                  <Route exact path="/Visualize" components={Visualize} />
                  <Route exact path="/Info" components={Info} />
                  <Button />
                  <br/>
                    
                  <center><Header /></center>

                  <VisWindow />
                  <br/>
                  <Footer />
                </div>
      </div>
  );

}

export default App;
