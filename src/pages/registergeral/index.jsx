// src/pages/Login.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../Background.jpg'; 

function Register() {
  return (
    <div className="bg-img" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="content">
        <header>Faça seu Cadastro</header>
        <p>Você deseja se cadastrar como aluno ou professor?</p>
        <nav className="buttons-container">
          <Link to="/registeraluno" className="button-link">Aluno</Link>
          <Link to="/registertutor" className="button-link">Professor</Link>
        </nav>
      </div>
    </div>
  );
}

export default Register;
