// src/pages/Login.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../Background.jpg'; 

function Login() {
  return (
    <div className="bg-img" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="content">
        <header>Início de Sessão</header>
        <p>Você deseja iniciar sessão como aluno ou professor?</p>
        <nav className="buttons-container">
          <Link to="/loginaluno" className="button-link">Aluno</Link>
          <Link to="/logintutor" className="button-link">Professor</Link>
        </nav>
      </div>
    </div>
  );
}

export default Login;
