import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import 'uno.css';
import EsBus from './utils/es-bus';

window.$bus = EsBus.getInstance();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  // </React.StrictMode>
)
