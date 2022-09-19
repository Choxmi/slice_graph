import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/common.scss'
import Slicer from './slicer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Slicer />
  </React.StrictMode>
);