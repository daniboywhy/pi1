// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'

function Home() {
  return (
    <div className='container'>
      <h1>Bem-vindo ao Sistema</h1>
      <p>Escolha uma das opções abaixo para navegar:</p>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Cadastro</Link> {/* Link para a nova página de cadastro */}
          </li>
          <li>
            <Link to="/profile">Perfil</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
