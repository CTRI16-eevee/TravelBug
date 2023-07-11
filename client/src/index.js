import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App.jsx';

import styles from './scss/application.scss';

// entry point where react initialized, renders root component, react app mounted onto DOM
ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );