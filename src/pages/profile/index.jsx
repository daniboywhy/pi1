import api from '../../services/api';
import React, { useEffect, useState, useRef } from 'react';
import './style.css'

function Profile() {
  const [user, setUser] = useState(null);

  const inputName = useRef();
  const inputCpf = useRef();
  const inputUser = useRef();
  const inputSenha = useRef();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get('/aluno');
        const userData = response.data;
        setUser(userData);
        inputName.current.value = userData.nome;
        inputCpf.current.value = userData.cpf;
        inputUser.current.value = userData.usuario;
        inputSenha.current.value = userData.senha;
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    }
    fetchUser();
  }, []);

  async function updateUser() {
    try {
      await api.put('/aluno', {
        usuario: inputUser.current.value,
        senha: inputSenha.current.value,
        nome: inputName.current.value,
        cpf: inputCpf.current.value,
      });
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Erro ao atualizar perfil!');
    }
  }

  return (
    <div className='container'>
      <h1>Perfil</h1>
      <input ref={inputName} placeholder="Nome" />
      <input ref={inputCpf} placeholder="CPF" />
      <input ref={inputUser} placeholder="Usuário" />
      <input ref={inputSenha} placeholder="Senha" type="password" />
      <button onClick={updateUser}>Atualizar Perfil</button>
    </div>
  );
}

export default Profile;
