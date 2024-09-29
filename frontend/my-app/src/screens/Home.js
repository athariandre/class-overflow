import React from 'react';

// /c:/Users/Zayd Nadir/Documents/howdy-hack-project/howdy-hack-2024/frontend/my-app/src/screens/home.js


// Removed duplicate Home component definition

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#282c34',
    color: '#ffffff',
    padding: '20px',
    textAlign: 'center',
  },
  header: {
    fontSize: '3rem',
    color: '#61dafb',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  },
  paragraph: {
    fontSize: '1.5rem',
    color: '#adb5bd',
    marginBottom: '30px',
    maxWidth: '600px',
    lineHeight: '1.6',
  },
  button: {
    fontSize: '1.2rem',
    color: '#ffffff',
    backgroundColor: '#61dafb',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#21a1f1',
  },
};

const handleMouseEnter = (e) => {
  e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
};

const handleMouseLeave = (e) => {
  e.target.style.backgroundColor = styles.button.backgroundColor;
};

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to ATHARIANDRE</h1>
      <p style={styles.paragraph}>Here, we will ANDREATHARI</p>
      <button
        style={styles.button}
        onClick={() => window.location.href = '/form'}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Go to Form
      </button>
    </div>
  );
};

export default Home;