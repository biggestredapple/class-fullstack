import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

import { MainPage } from 'pages';
import { PATH } from 'consts';

function App() {
  return (
    <Routes>
      <Route path={PATH.MAIN} element={<MainPage />} />
      <Route path="*" element={<Navigate to={PATH.MAIN} />} />
    </Routes>
  );
}

export default App;
