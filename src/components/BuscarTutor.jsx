// TutorList.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './BuscarTutor.css'; // Supondo que os estilos venham daqui

const ListarTutor = ({ alunoId }) => {
  const [tutores, setTutores] = useState([]);

  useEffect(() => {
    // Função para buscar os tutores e suas disciplinas
    const fetchTutores = async () => {
      try {
        const response = await api.get('/tutor'); 
        setTutores(response.data);
      } catch (error) {
        console.error('Erro ao buscar tutores:', error);
      }
    };

    // Chama a função fetchTutores uma vez
    fetchTutores();
  }, []);

  const handleIngressar = async (tutorId, disciplinaId) => {
    try {
      await api.post('/api/turma', {
        tutorId,
        disciplinaId,
        alunoId, // Usa o alunoId passado como prop
      });
      alert('Ingressou na disciplina com sucesso!');
    } catch (error) {
      console.error('Erro ao ingressar na disciplina:', error);
      alert('Falha ao ingressar na disciplina.');
    }
  };

  return (
    <div className="tutor-list-container">
      <h2>Lista de Professores</h2>
      <div className="tutor-grid">
        {tutores.map((tutor) => (
          <div className="tutor-card" key={tutor.id}>
            <h3>{tutor.nome}</h3>
            <div className="disciplinas">
              {tutor.turmas.map((turma) => (
                <div key={turma.id} className="disciplina-item">
                  <span>{turma.disciplina.nome}</span>
                  <button
                    onClick={() => handleIngressar(tutor.id, turma.disciplina.id)}
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
    </div>
  );
};

export default ListarTutor;
