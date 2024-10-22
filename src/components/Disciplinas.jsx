import React, { useEffect, useState } from "react";
import "./AccountSettings.css";
import api from "../services/api";

const Disciplinas = () => {
  const [disciplinas, setDisciplinas] = useState([]); // Definindo o estado para armazenar as disciplinas
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  // Carregar as disciplinas quando o componente for montado
  useEffect(() => {
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
      // Faz a requisição POST para criar a disciplina
      await api.post('/disciplina', { nome, descricao });
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

  return (
    <div className="accountsettings">
      <h1 className="mainhead1">Disciplinas</h1>

      <div className="tabeladisciplinas">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Alunos</th>
              <th>Ações</th> {/* Adicionando a coluna Ações para os botões de exclusão */}
            </tr>
          </thead>
          <tbody>
            {disciplinas.map((disciplina) => (
              <tr key={disciplina.id}> {/* Certifique-se de ter uma chave única, como 'id' */}
                <td>{disciplina.nome}</td>
                <td>{disciplina.descricao}</td>
                <td>{disciplina.alunos}</td> {/* Exemplo de campo para número de alunos */}
                <td>
                  <button
                    id="botaoDisc"
                    onClick={() => deleteDisciplina(disciplina.id)} // Chama a função com o ID da disciplina
                    className="botaoDisciplina"
                  >
                    Excluir
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
    </div>
  );
}

export default Disciplinas;
