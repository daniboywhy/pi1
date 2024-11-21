import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import api from '../../../services/api';
import { useTutores } from '../../../context/tutorescontext';
import './registertutor.css';
import backgroundImage from '../../Background.jpg';

function RegisterTutor() {
  const { listaTutores, atualizarTutores, adicionarTutor, removerTutor } = useTutores();
  const navigate = useNavigate(); // Instancia o hook useNavigate

  const inputEmail = useRef();
  const inputCpf = useRef();
  const inputUser = useRef();
  const inputName = useRef();
  const inputSenha = useRef();

  useEffect(() => {
    getTutores();
  }, []);

  async function getTutores() {
    try {
      const response = await api.get('/tutor');
      atualizarTutores(response.data.map(tutor => ({
        id: tutor.id.toString(),
        email: tutor.email,
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
        email: inputEmail.current.value,
        cpf: inputCpf.current.value,
        usuario: inputUser.current.value,
        nome: inputName.current.value,
        senha: inputSenha.current.value,
        tipoUsuario: "tutor"
      };

      const response = await api.post('/cadastro', newTutor);
      const createdTutor = response.data;

      adicionarTutor({
        id: createdTutor.id,
        email: newTutor.email,
        nome: newTutor.nome,
        cpf: newTutor.cpf,
        usuario: newTutor.usuario,
        senha: newTutor.senha
      });

      alert('Tutor criado com sucesso!'); // Exibe o alerta
      navigate('/login'); // Redireciona para a rota de login

      getTutores();
    } catch (error) {
      console.error('Erro ao criar tutor:', error);
      alert('Erro ao criar tutor!');
    }
  }

  return (
    <div 
      className="register-container" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <form className="register-form">
        <h1 className="register-title">Cadastro Professor</h1>
        <input ref={inputName} className="register-input" placeholder="Nome" />
        <input ref={inputCpf} className="register-input" placeholder="CPF" />
        <input ref={inputEmail} className="register-input" placeholder="E-mail" />
        <input ref={inputUser} className="register-input" placeholder="Usuário" />
        <input ref={inputSenha} className="register-input" placeholder="Senha" type="password" />
        <button 
          type="button" 
          className="register-button" 
          onClick={createTutor}
        >
          Registrar
        </button>
      </form>
    </div>
  );
}

export default RegisterTutor;
