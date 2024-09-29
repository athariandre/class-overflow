import React, { useState } from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #1d2671, #c33764)', // Vibrant gradient background
    color: '#ffffff',
    padding: '20px',
    textAlign: 'center',
  },
  header: {
    fontSize: '4rem',
    color: '#fffa65', // Bright, engaging color
    marginBottom: '20px',
    textShadow: '3px 3px 8px rgba(0, 0, 0, 0.6)', // Enhanced shadow effect
    letterSpacing: '1px',
  },
  paragraph: {
    fontSize: '1.5rem',
    color: '#e0e0e0',
    marginBottom: '40px',
    maxWidth: '700px',
    lineHeight: '1.8',
  },
  button: {
    fontSize: '1.5rem',
    color: '#ffffff',
    backgroundColor: '#61dafb',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '30px', // Rounded button for a modern look
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)', // Soft shadow for depth
  },
  buttonHover: {
    transform: 'scale(1.1)', // Enlarge button on hover
    backgroundColor: '#21a1f1',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.4)',
  },
};

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>how screwed am i?</h1>
      <p style={styles.paragraph}>
        We’re here to help you experience the best of our platform with innovative technology and an incredible user experience.
      </p>
      <button
        style={isHovered ? { ...styles.button, ...styles.buttonHover } : styles.button}
        onClick={() => window.location.href = '/form'}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Go to Form
      </button>
    </div>
  );
};

export default Home;
