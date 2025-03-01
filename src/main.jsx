import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.jsx';
import ReactGA from 'react-ga4';

// Initialize Google Analytics 4
ReactGA.initialize('G-FN20FSXPWT');

// Track the initial pageview
ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search, title: document.title });

// Render the application
const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);