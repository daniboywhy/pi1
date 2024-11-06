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

  const handleIngressar = async (tutorId, disciplinaId) => {
    try {
      await api.post('/turma', {
        tutorId,
        disciplinaId,
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
    <table border="1" cellPadding="10" cellSpacing="0">
  <thead>
    <tr>
      <th>Nome do Professor</th>
      <th>Disciplinas Ministradas</th>
    </tr>
  </thead>
  <tbody>
    {tutores.map((tutor) => (
      <tr key={tutor.id}>
        <td><strong>{tutor.nome}</strong></td>
        <td>
          <ul>
            {tutor.disciplinas.map((disciplina, index) => (
              <li key={index}>
                {disciplina.nome}
                <button 
                  onClick={() => handleIngressar(tutor.id, tutor.disciplinaIDs[index])} 
                  style={{ marginLeft: '10px' }}
                >
                  Ingressar
                </button>
              </li>
            ))}
          </ul>
        </td>
      </tr>
    ))}
  </tbody>
</table>
  </div>);
};

export default ListarTutor;