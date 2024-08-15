import api from '../../services/api';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'

function Login() {
  const inputUser = useRef();
  const inputSenha = useRef();
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const response = await api.post('/login', {
        usuario: inputUser.current.value,
        senha: inputSenha.current.value,
      });

      if (response.data.success) {
        navigate('/profile');
      } else {
        alert('Credenciais inválidas!');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login!');
    }
  }

  return (
    <div className='container'>
      <h1>Login</h1>
      <input ref={inputUser} placeholder="Usuário" />
      <input ref={inputSenha} placeholder="Senha" type="password" />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}

export default Login;
