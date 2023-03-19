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
import ErrorList from './Pages/ErrorList/ErrorList';
import ErrorEntry from './Pages/ErrorEntry/ErrorEntry';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/terminals' element={<TerminalList />} /> 
          <Route path='/terminals/:depCode/:filterCode' element={<TerminalLogin />} />
          <Route path='/terminal/defectentry/:depCode/:filterCode' element={<ErrorEntry />} />
          <Route path='/terminal/defcorrect' element={<ErrorList />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
