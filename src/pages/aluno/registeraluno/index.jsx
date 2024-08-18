import React, { useEffect, useRef } from 'react';
import api from '../../../services/api';
import { useAlunos } from '../../../context/alunoscontext';
import './style.css';

function Registeraluno() {
  const { listaAlunos, atualizarAlunos, adicionarAluno, removerAluno } = useAlunos();

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
      atualizarAlunos(response.data.map(user => ({
        id: user.id.toString(),
        nome: user.nome,
        cpf: user.cpf,
        usuario: user.usuario,
        senha: user.senha
      })));
      console.log('Data fetched:', response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }

  async function createUsers() {
    try {
      const newUser = {
        usuario: inputUser.current.value,
        senha: inputSenha.current.value,
        nome: inputName.current.value,
        cpf: inputCpf.current.value,
      };

      await api.post('/aluno', newUser);
      getUsers(); // Atualiza a lista de usuários

      adicionarAluno({
        id: newUser.usuario,  // ou algum outro identificador único
        nome: newUser.nome,
        cpf: newUser.cpf,
        usuario: newUser.usuario,
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
      getUsers(); // Atualiza a lista de usuários

      removerAluno(id);

    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      alert('Erro ao deletar usuário!');
    }
  }

  return (
    <div className="container">
      <h1>Cadastro Aluno</h1>
      <form>
        <input ref={inputName} placeholder="Nome" />
        <input ref={inputCpf} placeholder="CPF" />
        <input ref={inputUser} placeholder="Usuário" />
        <input ref={inputSenha} placeholder="Senha" type="password" />
        <button type="button" onClick={createUsers}>Registrar</button>
      </form>

      <h2>Alunos Registrados:</h2>
      <ul>
        {listaAlunos.map((user) => (
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

export default Registeraluno;
