import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './BuscarTutor.css';

const ListarTutor = ({ alunoId }) => {
  const [aluno, setAluno] = useState([]);
  const [turmas, setTurmas] = useState([]);

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
    const fetchTurmas = async () => {
    try {
      const response = await api.get('/turma');
      setTurmas(response.data);
    } catch (error) {
      console.error('Erro ao buscar turmas:', error);
    }
  };

    // Chama a função fetchTutores uma vez
    fetchAluno();
    fetchTurmas();
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

  return (<p>oi</p>
    /*<div className="tutor-list-container">
      <h2>Lista de Professores</h2>
      <div className="tutor-grid">
        {turmas.map((turma) => (
          <div className="tutor-card" key={turma.tutor.id}>
            <h3>{turma.tutor.nome}</h3>
            <div className="disciplinas">
              {tutor.disciplinas && tutor.disciplinas.map((disciplina, index) => (
                <div key={index} className="disciplina-item">
                  <span>{disciplina}</span>
                  <button
                    onClick={() => handleIngressar(tutor.id, toString({disciplina}))}
                    className="ingressar-button"
                  >
                    Ingressar nessa disciplina
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>*/);
};

export default ListarTutor;