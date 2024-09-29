import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './screens/home'; // Ensure paths are correct
import Form from './screens/Form';
import './App.css'; // Ensure this path is correct

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

      {/* Main Content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
      </Routes>

      {/* Footer */}
      <footer className="App-footer">
        <p>Built with ❤️ for students!</p>
      </footer>
    </Router>
  );
}

export default App;
