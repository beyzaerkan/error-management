import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import './styles/index.css';
import App from './App';
import TerminalListPage from './Pages/TerminalList/TerminalList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/terminals' element={<TerminalListPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
