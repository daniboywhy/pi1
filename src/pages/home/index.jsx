// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../Background.jpg'; 
import './home.css';

function Home() {
  return (
    <div className="bg-img" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="content">
        <header>Bem-vindo ao Tutor Aluno</header>
        <p>Escolha uma das opções abaixo para navegar:</p>
        <nav className="buttons-container">
          <Link to="/login" className="button-link">Login</Link>
          <Link to="/register" className="button-link">Cadastro</Link>
        </nav>
      </div>
    </div>
  );
}

export default Home;
