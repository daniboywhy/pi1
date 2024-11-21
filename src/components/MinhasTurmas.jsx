import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Turmas = () => {
  const [turmasPendentes, setTurmasPendentes] = useState([]);
  const [turmasAprovadas, setTurmasAprovadas] = useState([]);
  const [tutorId, setTutorId] = useState('');

  useEffect(() => {
    // Busca o ID do tutor logado
    async function fetchTutorId() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await api.get("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTutorId(response.data.id);
        console.log(tutorId)
      } catch (error) {
        console.error("Erro ao buscar ID do tutor:", error);
      }
    }

    fetchTutorId();
  }, []);

  // Carregar turmas pendentes e aprovadas
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
      console.log(response.data)
    } catch (error) {
      console.error("Erro ao buscar turmas pendentes:", error);
    }
  };

  const fetchTurmasAprovadas = async () => {
    try {
      const response = await api.get(`/tutor/${tutorId}/turmas-aprovadas`);
      setTurmasAprovadas(response.data);
    } catch (error) {
      console.error("Erro ao buscar turmas aprovadas:", error);
    }
  };

  const handleAprovarTurma = async (id) => {
    try {
      await api.put(`/turma/${id}/aprovar`);
      alert("Turma aprovada com sucesso!");
      fetchTurmasPendentes(); // Atualiza a tabela de pendentes
      fetchTurmasAprovadas(); // Atualiza a tabela de aprovadas
    } catch (error) {
      console.error("Erro ao aprovar turma:", error);
      alert("Erro ao aprovar turma.");
    }
  };

  return (
    <div>
      <h1>Gestão de Turmas</h1>

      {/* Tabela de Turmas Pendentes */}
      <h2>Turmas Pendentes</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Disciplina</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {turmasPendentes.map((turma) => (
            <tr key={turma.id}>
              <td>{turma.aluno.nome}</td>
              <td>{turma.disciplina.nome}</td>
              <td>
                <button onClick={() => handleAprovarTurma(turma.id)}>Aprovar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tabela de Turmas Aprovadas */}
      <h2>Turmas Aprovadas</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Disciplina</th>
          </tr>
        </thead>
        <tbody>
          {turmasAprovadas.map((turma) => (
            <tr key={turma.id}>
              <td>{turma.aluno.nome}</td>
              <td>{turma.disciplina.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Turmas;
