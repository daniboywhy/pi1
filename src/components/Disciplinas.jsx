import React, { useEffect, useState } from "react";
import "./AccountSettings.css";
import api from "../services/api";

const Disciplinas = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleCreateDisciplina = async () => {
    try {
      // Faz a requisição POST para criar a disciplina
      await api.post('/disciplina', { nome, descricao });
      alert('Disciplina criada com sucesso!');
      // Limpar os campos após a criação
      setNome('');
      setDescricao('');
    } catch (error) {
      alert('Erro ao criar disciplina');
      console.error(error);
    }
  };

  return (
    <div className="accountsettings">
      <h1 className="mainhead1">Disciplinas</h1>

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
          <label htmlFor="email">
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
