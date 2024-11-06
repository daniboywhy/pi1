import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './BuscarTutor.css';

const ListarTutor = ({ alunoId }) => {
  const [aluno, setAluno] = useState([]);
  const [tutores, setTutores] = useState([]);

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await api.get("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAluno(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao buscar aluno:', error);
      }
    };
    
    // Função para buscar os tutores e suas disciplinas
    const fetchTutores = async () => {
    try {
      const response = await api.get('/tutordisciplinas');
      setTutores(response.data);
    } catch (error) {
      console.error('Erro ao buscar turmas:', error);
    }
  };

    // Chama a função fetchTutores uma vez
    fetchAluno();
    fetchTutores();
  }, []);

  const handleIngressar = async (tutorId, disciplina) => {
    try {
      await api.post('/turma', {
        tutorId,
        disciplina,
        alunoId: aluno.id
      });
      alert('Ingressou na disciplina com sucesso!');
    } catch (error) {
      console.error('Erro ao ingressar na disciplina:', error);
      alert('Falha ao ingressar na disciplina.');
    }
  };

  return (
    <div>
      <h1>Lista de Professores e Disciplinas</h1>
      <ul>
        {tutores.map((tutor) => (
          <li key={tutor.id}>++++++++
            <strong>{tutor.nome}</strong>
            <ul>
              {tutor.disciplinas.map((disciplina, index) => (
                <li key={index}>{disciplina.nome}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarTutor;