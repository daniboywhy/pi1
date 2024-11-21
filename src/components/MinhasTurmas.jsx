import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './MinhasTurmas.css'; // Adicionar o CSS correspondente

const Turmas = () => {
  const [turmasPendentes, setTurmasPendentes] = useState([]);
  const [turmasAprovadas, setTurmasAprovadas] = useState([]);
  const [tutorId, setTutorId] = useState('');

  useEffect(() => {
    async function fetchTutorId() {
      try {
        const token = localStorage.getItem('authToken');
        const response = await api.get('/api/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTutorId(response.data.id);
      } catch (error) {
        console.error('Erro ao buscar ID do tutor:', error);
      }
    }

    fetchTutorId();
  }, []);

  useEffect(() => {
    if (tutorId) {
      fetchTurmasPendentes();
      fetchTurmasAprovadas();
    }
  }, [tutorId]);

  const fetchTurmasPendentes = async () => {
    try {
      const response = await api.get(`/tutor/${tutorId}/turmas-pendentes`);
      setTurmasPendentes(response.data);
    } catch (error) {
      console.error('Erro ao buscar turmas pendentes:', error);
    }
  };

  const fetchTurmasAprovadas = async () => {
    try {
      const response = await api.get(`/tutor/${tutorId}/turmas-aprovadas`);
      setTurmasAprovadas(response.data);
    } catch (error) {
      console.error('Erro ao buscar turmas aprovadas:', error);
    }
  };

  const handleAprovarTurma = async (id) => {
    try {
      await api.put(`/turma/${id}/aprovar`);
      alert('Turma aprovada com sucesso!');
      fetchTurmasPendentes();
      fetchTurmasAprovadas();
    } catch (error) {
      console.error('Erro ao aprovar turma:', error);
      alert('Erro ao aprovar turma.');
    }
  };

  const handleRecusarTurma = async (id) => {
    try {
      await api.delete(`/turma/${id}`);
      alert('Turma recusada com sucesso!');
      fetchTurmasPendentes();
    } catch (error) {
      console.error('Erro ao recusar turma:', error);
      alert('Erro ao recusar turma.');
    }
  };

  return (
    <div className="gestao-turmas">
      <h1>Gestão de Turmas</h1>

      <h2>Turmas Pendentes</h2>
      <div className="turmas-grid">
        {turmasPendentes.map((turma) => (
          <div key={turma.id} className="turma-item">
            <h3>Aluno: {turma.aluno.nome}</h3>
            <p>Disciplina: {turma.disciplina.nome}</p>
            <div className="botoes-acoes">
              <button onClick={() => handleAprovarTurma(turma.id)}>Aprovar</button>
              <button onClick={() => handleRecusarTurma(turma.id)}>Recusar</button>
            </div>
          </div>
        ))}
      </div>

      <h2>Turmas Aprovadas</h2>
      <div className="turmas-grid">
        {turmasAprovadas.map((turma) => (
          <div key={turma.id} className="turma-item">
            <h3>Aluno: {turma.aluno.nome}</h3>
            <p>Disciplina: {turma.disciplina.nome}</p>
            <p>
              Avaliação:{' '}
              {turma.avaliacao ? (
                <span>{turma.avaliacao} / 5</span>
              ) : (
                <span>Ainda não avaliado</span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Turmas;
