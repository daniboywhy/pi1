import React, { useEffect, useRef } from 'react';
import api from '../../../services/api';
import { useAlunos } from '../../../context/alunoscontext';
import './registeraluno.css';
import backgroundImage from '../../background.jpg'; 

function Registeraluno() {
  const { listaAlunos, atualizarAlunos, adicionarAluno, removerAluno } = useAlunos();

  const inputEmail = useRef();
  const inputCpf = useRef();
  const inputUser = useRef();
  const inputName = useRef();
  const inputSenha = useRef();

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const response = await api.get('/aluno');
      atualizarAlunos(response.data.map(user => ({
        id: user.id.toString(),
        email: user.email,
        cpf: user.cpf,
        usuario: user.usuario,
        nome: user.nome,
        senha: user.senha
      })));
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }

  async function createUsers() {
    try {
      const newUser = {
        email: inputEmail.current.value,
        cpf: inputCpf.current.value,
        usuario: inputUser.current.value,
        nome: inputName.current.value,
        senha: inputSenha.current.value,
        tipoUsuario: "aluno"
      };

      await api.post('/cadastro', newUser);
      getUsers();
      adicionarAluno({
        id: newUser.usuario,
        email: newUser.email,
        cpf: newUser.cpf,
        usuario: newUser.usuario,
        nome: newUser.nome,
        senha: newUser.senha
      });

    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Erro ao criar usuário!');
    }
  }

  async function deleteUsers(id) {
    try {
      await api.delete(`/aluno/${id}`);
      getUsers();
      removerAluno(id);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      alert('Erro ao deletar usuário!');
    }
  }

  return (
    <div 
      className="register-container" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <form className="register-form">
        <h1 className="register-title">Cadastro Aluno</h1>
        <input ref={inputName} className="register-input" placeholder="Nome" />
        <input ref={inputCpf} className="register-input" placeholder="CPF" />
        <input ref={inputEmail} className="register-input" placeholder="E-mail" />
        <input ref={inputUser} className="register-input" placeholder="Usuário" />
        <input ref={inputSenha} className="register-input" placeholder="Senha" type="password" />
        <button type="button" className="register-button" onClick={createUsers}>Registrar</button>
      </form>
    </div>
  );
}

export default Registeraluno;
