import React, { useEffect, useState } from "react";
import "./AccountSettings.css";
import api from "../services/api";

const Disciplinas = () => {
  const [disciplinas, setDisciplinas] = useState([]); // Estado para armazenar as disciplinas
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [editingDisciplina, setEditingDisciplina] = useState(null);
  const [editedNome, setEditedNome] = useState('');
  const [editedDescricao, setEditedDescricao] = useState('');
  const [userData, setUserData] = useState({ tutorId: "" }); // Inicializando como um objeto com tutorId vazio

  // Carregar os dados do usuário e as disciplinas quando o componente for montado
  useEffect(() => {
    async function fetchUserData() {
      try {
        const token = localStorage.getItem("authToken"); // Obter o token de autenticação
        const response = await api.get("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log("Dados do usuário recebidos:", response.data); // Verificar resposta da API
        setUserData({ tutorId: response.data.id }); // Definir o estado corretamente com tutorId
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
      }
    }
  
    fetchUserData();
    carregarDisciplinas(); // Carrega as disciplinas ao montar o componente
  }, []);
  

  const carregarDisciplinas = async () => {
    try {
      const response = await api.get('/disciplina'); // Substitua pelo endpoint da sua API
      setDisciplinas(response.data); // Armazena as disciplinas no estado
    } catch (error) {
      console.error('Erro ao buscar disciplinas:', error);
    }
  };

  // Função para criar uma nova disciplina
  const handleCreateDisciplina = async () => {
    try {
      // Verifica se tutorId está presente antes de prosseguir
      if (!userData.tutorId) {
        alert('ID do tutor não encontrado.');
        return;
      }
      
      // Faz a requisição POST para criar a disciplina
      await api.post('/disciplina', { nome, descricao, tutorId: userData.tutorId });
      alert('Disciplina criada com sucesso!');
      
      // Limpar os campos após a criação
      setNome('');
      setDescricao('');

      // Recarregar as disciplinas após a criação de uma nova
      carregarDisciplinas();
    } catch (error) {
      alert('Erro ao criar disciplina');
      console.error(error);
    }
  };

  // Função para excluir uma disciplina com confirmação
  const deleteDisciplina = async (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir esta disciplina?");
    if (confirmacao) {
      try {
        await api.delete(`/disciplina/${id}`); // Substitua pelo endpoint da sua API para exclusão
        alert('Disciplina excluída com sucesso!');
        carregarDisciplinas(); // Recarrega as disciplinas após a exclusão
      } catch (error) {
        alert('Erro ao excluir disciplina');
        console.error(error);
      }
    } else {
      alert('Exclusão cancelada');
    }
  };

  const handleEditClick = (disciplina) => {
    setEditingDisciplina(disciplina.id); // Define a disciplina a ser editada
    setEditedNome(disciplina.nome); // Preenche o campo de edição com o nome atual
    setEditedDescricao(disciplina.descricao); // Preenche o campo de edição com a descrição atual
  };

  const handleSaveEdit = async () => {
    try {
      await api.put(`/disciplina/${editingDisciplina}`, { nome: editedNome, descricao: editedDescricao }); // Endpoint para editar disciplina
      alert('Disciplina atualizada com sucesso!');
      setEditingDisciplina(null); // Reseta o estado de edição
      carregarDisciplinas(); // Recarrega as disciplinas
    } catch (error) {
      alert('Erro ao atualizar a disciplina');
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditingDisciplina(null); // Sai do modo de edição
  };

  return (
    <div className="accountsettings">
      <h1 className="mainhead1">Disciplinas</h1>
      <div className="tabeladisciplinas">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {disciplinas.map((disciplina) => (
              <tr key={disciplina.id}>
                <td>{disciplina.nome}</td>
                <td>{disciplina.descricao}</td>
                <td>
                  <button
                    id="botaoDisc"
                    onClick={() => deleteDisciplina(disciplina.id)} // Chama a função com o ID da disciplina
                    className="botaoDisciplina"
                  >
                    Excluir
                  </button>
                  <button
                    id="botaoDiscEdit"
                    onClick={() => handleEditClick(disciplina)}
                    className="botaoEditar"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="form">
        <div className="form-group">
          <label htmlFor="nome">
            Nome<span>*</span>
          </label>
          <input
            type="text"
            name="nome"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="descricao">
            Descrição<span>*</span>
          </label>
          <input
            type="text"
            name="descricao"
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <button onClick={handleCreateDisciplina} className="mainbutton1">Criar disciplina</button>
      </div>
      {editingDisciplina && (
        <div>
          <h1 className="mainhead1">Editar Disciplina</h1>
          <div className="form-group">
            <label htmlFor="editNome">
              Nome<span>*</span>
            </label>
            <input
              type="text"
              id="editNome"
              value={editedNome}
              onChange={(e) => setEditedNome(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editDescricao">
              Descrição<span>*</span>
            </label>
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
