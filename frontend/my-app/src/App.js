import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Home from './screens/home'; // Ensure paths are correct
import Form from './screens/Form';
import './App.css'; // Ensure this path is correct

// Component handling the routing with transitions
function AnimatedRoutes() {
  const location = useLocation(); // Now useLocation is inside Router

  return (
    <TransitionGroup className="transition-group">
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={300} // Duration of transition
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="Navbar">
        <ul className="app-nav-list">
          <li className="app-nav-item">
            <Link to="/" className="app-nav-link">Home</Link>
          </li>
          <li className="app-nav-item">
            <Link to="/form" className="app-nav-link">Form</Link>
          </li>
        </ul>
      </nav>

      {/* Render AnimatedRoutes for transitions */}
      <AnimatedRoutes />

      {/* Footer */}
      <footer className="App-footer">
        <p>Built with ❤️ for students!</p>
      </footer>
    </Router>
  );
}

export default App;
