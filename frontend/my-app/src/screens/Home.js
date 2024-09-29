import React, { useState } from 'react';
import './home.css'; // Separate CSS file for styles

const Home = ({ scrollToForm }) => {
  return (
    <div className="home-container">
      <h1 className="home-header">
        <span className = "bracket-text">{'{'}</span><span className="class-text">class</span> <span className="overflow-text">overflow</span><span className = "bracket-text">{'}'} </span>
      </h1>
      <button className="scroll-button" onClick={scrollToForm}>
        calculate your overflow
      </button>
    </div>
  );
};

export default Home;
