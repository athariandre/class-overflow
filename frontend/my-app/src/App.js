import React, { useRef } from 'react';
import Home from './screens/home';
import Form from './screens/Form';
import './App.css';

function App() {
  // Create refs for each section
  const homeRef = useRef(null);
  const formRef = useRef(null);

  // Smooth scroll function
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">

      {/* Sections */}
      <div ref={homeRef} className="home-section">
        <Home scrollToForm={() => scrollToSection(formRef)} />
      </div>

      <div ref={formRef} className="form-section">
        <Form />
      </div>

      {/* Footer */}
      <footer className="App-footer">
        <p>Built with ❤️ for students!</p>
      </footer>
    </div>
  );
}

export default App;
