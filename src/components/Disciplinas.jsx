import React, { useEffect, useState } from "react";
import "./Disciplinas.css";
import api from "../services/api";

const Disciplinas = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [editingDisciplina, setEditingDisciplina] = useState(null);
  const [editedNome, setEditedNome] = useState("");
  const [editedDescricao, setEditedDescricao] = useState("");
  const [userData, setUserData] = useState({ tutorId: "" });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await api.get("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData({ tutorId: response.data.id });
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
      }
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData.tutorId) {
      carregarDisciplinas(userData.tutorId);
    }
  }, [userData.tutorId]);

  const carregarDisciplinas = async (id) => {
    try {
      const response = await api.get(`/tutor/${id}/disciplinas`);
      setDisciplinas(response.data);
    } catch (error) {
      console.error("Erro ao buscar disciplinas:", error);
    }
  };

  const handleCreateDisciplina = async () => {
    try {
      if (!userData.tutorId) {
        alert("ID do tutor não encontrado.");
        return;
      }
      await api.post("/disciplina", { nome, descricao, tutorId: userData.tutorId });
      alert("Disciplina criada com sucesso!");
      setNome("");
      setDescricao("");
      carregarDisciplinas(userData.tutorId);
    } catch (error) {
      alert("Erro ao criar disciplina");
      console.error(error);
    }
  };

  const deleteDisciplina = async (disciplinaId) => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir esta disciplina?");
    if (!confirmacao) return;
    try {
      await api.delete(`/disciplina/${disciplinaId}`);
      alert("Disciplina excluída com sucesso!");
      carregarDisciplinas(userData.tutorId);
    } catch (error) {
      alert("Erro ao excluir disciplina");
      console.error(error);
    }
  };

  const handleEditClick = (disciplina) => {
    setEditingDisciplina(disciplina.id);
    setEditedNome(disciplina.nome);
    setEditedDescricao(disciplina.descricao);
  };

  const handleSaveEdit = async () => {
    try {
      await api.put(`/disciplina/${editingDisciplina}`, {
        nome: editedNome,
        descricao: editedDescricao,
      });
      alert("Disciplina atualizada com sucesso!");
      setEditingDisciplina(null);
      carregarDisciplinas(userData.tutorId);
    } catch (error) {
      alert("Erro ao atualizar a disciplina");
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditingDisciplina(null);
  };

  return (
    <div className="accountsettings">
      <h1 className="mainhead1">Disciplinas</h1>
      <div className="tabeladisciplinas">
        {disciplinas.map((disciplina) => (
          <div key={disciplina.id} className="disciplina-item">
            <h3>{disciplina.nome}</h3>
            <p>{disciplina.descricao}</p>
            <div className="botoes-acoes">
              <button onClick={() => deleteDisciplina(disciplina.id)} className="botaoDisciplina">
                Excluir
              </button>
              <button onClick={() => handleEditClick(disciplina)} className="botaoEditar">
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="form">
        <div className="form-group">
          <label htmlFor="nome">Nome<span>*</span></label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição<span>*</span></label>
          <input
            type="text"
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <button onClick={handleCreateDisciplina} className="mainbutton1">
          Criar disciplina
        </button>
      </div>

      {editingDisciplina && (
        <div>
          <h1>Editar Disciplina</h1>
          <div className="form-group">
            <label htmlFor="editNome">Nome<span>*</span></label>
            <input
              type="text"
              id="editNome"
              value={editedNome}
              onChange={(e) => setEditedNome(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editDescricao">Descrição<span>*</span></label>
            <input
              type="text"
              id="editDescricao"
              value={editedDescricao}
              onChange={(e) => setEditedDescricao(e.target.value)}
            />
          </div>
          <button onClick={handleSaveEdit}>Salvar</button>
          <button onClick={handleCancelEdit}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default Disciplinas;
