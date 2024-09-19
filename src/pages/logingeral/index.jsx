import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='container'>
      <h1>Início de Sessão</h1>
      <p>Você deseja iniciar sessão como aluno ou professor?</p>
      <nav>
        <ul>
          <li>
            <Link to="/loginaluno">Aluno</Link>
          </li>
          <li>
            <Link to="/logintutor">Professor</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Login;
