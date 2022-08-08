import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home } from './app/components/Home';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);

// Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
