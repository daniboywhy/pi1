// src/pages/Register.jsx
import React, { useEffect, useState, useRef } from 'react';
import api from '../../services/api';
import './style.css';

function Register() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputCpf = useRef();
  const inputUser = useRef();
  const inputSenha = useRef();

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const response = await api.get('/aluno');
      setUsers(response.data);
      console.log('Data fetched:', response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }

  async function createUsers() {
    try {
      await api.post('/aluno', {
        usuario: inputUser.current.value,
        senha: inputSenha.current.value,
        nome: inputName.current.value,
        cpf: inputCpf.current.value,
      });
      getUsers(); // Atualiza a lista de usuários
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Erro ao criar usuário!');
    }
  }

  async function deleteUsers(id) {
    try {
      await api.delete(`/aluno/${id}`);
      getUsers(); // Atualiza a lista de usuários
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      alert('Erro ao deletar usuário!');
    }
  }

  return (
    <div className="container">
  <h1>Cadastro</h1>
  <form>
    <input ref={inputName} placeholder="Nome" />
    <input ref={inputCpf} placeholder="CPF" />
    <input ref={inputUser} placeholder="Usuário" />
    <input ref={inputSenha} placeholder="Senha" type="password" />
    <button onClick={createUsers}>Registrar</button>
  </form>

  <h2>Usuários Registrados:</h2>
  <ul>
    {users.map((user) => (
      <li key={user.id} className="card">
        <p>{user.nome}</p>
        <p>{user.cpf}</p>
        <button onClick={() => deleteUsers(user.id)}>Deletar</button>
      </li>
    ))}
  </ul>
</div>

  );
}

export default Register;
