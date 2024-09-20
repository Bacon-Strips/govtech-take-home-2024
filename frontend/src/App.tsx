import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeamRankingPage from "./pages/TeamRankingPage"
import LoginRegisterPage from './pages/LoginRegisterPage';
import "./App.css"
import LogProvider from "./contexts/LogContext"

function App() {

  return (
    <LogProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginRegisterPage />} />
          <Route path="/" element={<TeamRankingPage />} />
        </Routes>
      </Router>
    </LogProvider>
  )
}

export default App
