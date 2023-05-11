import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './Utils/i18n';

import './styles/index.css';
import './styles/variables.css';
import App from './App';
import TerminalList from './Pages/TerminalList/TerminalList';
import TerminalLogin from './Pages/TerminalLogin/TerminalLogin';
import DefectList from './Pages/DefectList/DefectList';
import DefectEntry from './Pages/DefectEntry/DefectEntry';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/terminals' element={<TerminalList />} /> 
          <Route path='/terminals/:depCode/:filterCode' element={<TerminalLogin />} />
          <Route path='/terminal/defectentry/:depCode/:filterCode' element={<DefectEntry />} />
          <Route path='/terminal/defcorrect' element={<DefectList />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
