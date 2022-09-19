import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import "./assets/css/custom.css"
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

