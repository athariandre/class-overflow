import React from 'react';

// /c:/Users/Zayd Nadir/Documents/howdy-hack-project/howdy-hack-2024/frontend/my-app/src/screens/home.js


const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to Howdy Hack 2024!</h1>
      <p style={styles.paragraph}>This is the home screen of your web app.</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: '2.5rem',
    color: '#333',
  },
  paragraph: {
    fontSize: '1.2rem',
    color: '#666',
  },
};

export default Home;