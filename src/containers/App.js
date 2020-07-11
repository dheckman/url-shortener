import React from 'react';
import logo from '../logo.svg';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.header_content}>
          <img src={logo} className={styles.logo} alt="logo" />
          <p className={styles.subheading}>url shortener</p>
        </div>
      </header>
    </div>
  );
}

export default App;
