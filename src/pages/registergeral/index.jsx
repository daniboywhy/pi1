import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'

function Register() {
  return (
    <div className='container'>
      <h1>Bem-vindo ao Sistema</h1>
      <p>Você deseja se cadastrar como aluno ou professor?</p>
      <nav>
        <ul>
          <li>
            <Link to="/registeraluno">Aluno</Link>
          </li>
          <li>
            <Link to="/registertutor">Professor</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Register;
