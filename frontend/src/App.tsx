import { GlobalReset } from './StyledApp.js'
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import { DashboardPage } from './Components/Dashboard/index.js';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';



function App() {

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
      <GlobalReset />
    </div>
  )
}

export default App
