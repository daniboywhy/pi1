import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Disciplinas.css'; // Certifique-se de criar este arquivo CSS

function Disciplinas() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [disciplinaId, setDisciplinaId] = useState(null);

  // Função para buscar as disciplinas
  const fetchDisciplinas = async () => {
    try {
      const response = await axios.get('/api/disciplina');
      //setDisciplinas(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar disciplinas.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisciplinas();
  }, []);

  const handleCreateDisciplina = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        '/api/disciplina',
        { nome, descricao },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDisciplinas([...disciplinas, response.data]);
      setNome('');
      setDescricao('');
    } catch (err) {
      console.error('Erro ao criar disciplina:', err);
    }
  };

  const handleUpdateDisciplina = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put(
        `/api/disciplina/${id}`,
        { nome, descricao },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedDisciplinas = disciplinas.map((disciplina) =>
        disciplina.id === id ? response.data : disciplina
      );
      setDisciplinas(updatedDisciplinas);
      setNome('');
      setDescricao('');
      setDisciplinaId(null);
    } catch (err) {
      console.error('Erro ao atualizar disciplina:', err);
    }
  };

  const handleDeleteDisciplina = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`/api/disciplina/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDisciplinas(disciplinas.filter((disciplina) => disciplina.id !== id));
    } catch (err) {
      console.error('Erro ao deletar disciplina:', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disciplinaId) {
      handleUpdateDisciplina(disciplinaId);
    } else {
      handleCreateDisciplina();
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="disciplinas-container">
      <h2>Disciplinas</h2>

      <form onSubmit={handleSubmit} className="disciplinas-form">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="disciplinas-input"
        />
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          className="disciplinas-input"
        />
        <button type="submit" className="disciplinas-button">
          {disciplinaId ? 'Atualizar Disciplina' : 'Criar Disciplina'}
        </button>
      </form>

      <ul className="disciplinas-list">
        {disciplinas.map((disciplina) => (
          <li key={disciplina.id} className="disciplinas-item">
            <span>{disciplina.nome} - {disciplina.descricao}</span>
            <button 
              onClick={() => {
                setNome(disciplina.nome);
                setDescricao(disciplina.descricao);
                setDisciplinaId(disciplina.id);
              }}
              className="disciplinas-edit-button"
            >
              Editar
            </button>
            <button 
              onClick={() => handleDeleteDisciplina(disciplina.id)} 
              className="disciplinas-delete-button"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Disciplinas;
