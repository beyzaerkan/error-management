import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import './styles/index.css';
import App from './App';
import TerminalList from './Pages/TerminalList/TerminalList';
import TerminalLogin from './Pages/TerminalLogin/TerminalLogin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/terminals' element={<TerminalList />} />
        <Route path='/terminal' element={<TerminalLogin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
