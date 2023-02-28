import React from 'react';
import pagenotfound from '../../img/404.png';
import { Link } from 'react-router-dom';

function AppPageNotFound() {
  return (
    <div style={{ backgroundColor: 'white', height: '100vh' }}>
      <img
        src={pagenotfound}
        alt="PageNotFound"
        style={{
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
          maxWidth: '450px',
          height: 'auto',
        }}
      />
      <h1 style={{ fontSize: '30px', fontWeight: '500' }}>
        Ooops! Something is missing...{' '}
      </h1>
      <p style={{ textAlign: 'center', fontWeight: '400', fontSize: '20px' }}>
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable.
      </p>
      <Link
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '20px',
          color: '#e64664',
          fontWeight: '700',
        }}
        to="/"
      >
        GO TO HOME
      </Link>
    </div>
  );
}

export default AppPageNotFound;
