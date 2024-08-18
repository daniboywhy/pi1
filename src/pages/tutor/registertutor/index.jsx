import React, { useEffect, useRef } from 'react';
import api from '../../../services/api';
import { useTutores } from '../../../context/tutorescontext';
import './style.css';

function RegisterTutor() {
  const { listaTutores, atualizarTutores, adicionarTutor, removerTutor } = useTutores();

  const inputName = useRef();
  const inputCpf = useRef();
  const inputUser = useRef();
  const inputSenha = useRef();

  useEffect(() => {
    getTutores();
  }, []);

  async function getTutores() {
    try {
      const response = await api.get('/tutor');
      atualizarTutores(response.data.map(tutor => ({
        id: tutor.id.toString(),
        nome: tutor.nome,
        cpf: tutor.cpf,
        usuario: tutor.usuario,
        senha: tutor.senha
      })));
      console.log('Data fetched:', response.data);
    } catch (error) {
      console.error('Erro ao buscar tutores:', error);
    }
  }

  async function createTutor() {
    try {
      const newTutor = {
        usuario: inputUser.current.value,
        senha: inputSenha.current.value,
        nome: inputName.current.value,
        cpf: inputCpf.current.value,
      };

      const response = await api.post('/tutor', newTutor);

      const createdTutor = response.data;

      adicionarTutor({
        id: createdTutor.id,  // Usa o ID gerado pelo banco
        nome: newTutor.nome,
        cpf: newTutor.cpf,
        usuario: newTutor.usuario,
        senha: newTutor.senha
      });

      getTutores(); // Atualiza a lista de tutores no estado

    } catch (error) {
      console.error('Erro ao criar tutor:', error);
      alert('Erro ao criar tutor!');
    }
  }

  async function deleteTutor(id) {
    try {
      await api.delete(`/tutor/${id}`);
      removerTutor(id);
      getTutores(); // Atualiza a lista de tutores no estado
    } catch (error) {
      console.error('Erro ao deletar tutor:', error);
      alert('Erro ao deletar tutor!');
    }
  }

  return (
    <div className="container">
      <h1>Cadastro Professor</h1>
      <form>
        <input ref={inputName} placeholder="Nome" />
        <input ref={inputCpf} placeholder="CPF" />
        <input ref={inputUser} placeholder="Usuário" />
        <input ref={inputSenha} placeholder="Senha" type="password" />
        <button type="button" onClick={createTutor}>Registrar</button>
      </form>

      <h2>Professores Registrados:</h2>
      <ul>
        {listaTutores.map(tutor => (
          <li key={tutor.id} className="card">
            <p>{tutor.nome}</p>
            <p>{tutor.cpf}</p>
            <button onClick={() => deleteTutor(tutor.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RegisterTutor;
