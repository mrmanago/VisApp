import React from 'react'
import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Button from "./components/Button"
import VisWindow from "./components/VisWindow";

const App = () => {
  return (
      <div>
          <Header />
            <div>
                <Nav />
                <div className="Content">
                    <Button />
                    <VisWindow />
                </div>
            </div>
          <Footer />
      </div>
  );
}

export default App;
