// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Página inicial como hub de navegação */}
        <Route path="/login" element={<Login />} /> {/* Página de Login */}
        <Route path="/profile" element={<Profile />} /> {/* Página de Perfil */}
        <Route path="/register" element={<Register />} /> {/* Página de Cadastro */}
      </Routes>
    </Router>
  </React.StrictMode>
);
