import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import { LaneApp } from './LaneApp';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LaneApp />
  </React.StrictMode>,
);
