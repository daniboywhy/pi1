// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/profile';
import Login from './pages/aluno/loginaluno';
import Registeraluno from './pages/aluno/registeraluno';
import Registertutor from './pages/tutor/registertutor';
import Register from './pages/registergeral';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registeraluno" element={<Registeraluno />} />
        <Route path="/registertutor" element={<Registertutor />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
