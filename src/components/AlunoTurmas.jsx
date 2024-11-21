import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./AccountSettings.css";

const MinhasDisciplinas = () => {
  const [aluno, setAluno] = useState({});
  const [disciplinasVinculadas, setDisciplinasVinculadas] = useState([]);

  useEffect(() => {
    // Buscar informações do aluno logado
    const fetchAluno = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await api.get("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response)
        setAluno(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do aluno:", error);
      }
    };

    // Buscar disciplinas vinculadas ao aluno
    const fetchDisciplinasVinculadas = async () => {
        let alunoId = aluno.id
      try {
        const response = await api.get(`/aluno/${alunoId}/minhas-disciplinas`);
        setDisciplinasVinculadas(response.data);
        console.log(response)
      } catch (error) {
        console.error("Erro ao buscar disciplinas vinculadas:", error);
        console.log(error)
      }
    };

    fetchAluno();
    if (aluno.id) fetchDisciplinasVinculadas();
  }, [aluno.id]);

  const handleAvaliacao = async (turmaId, avaliacao) => {
    try {
      await api.put(`/turma/${turmaId}/avaliacao`, { avaliacao });
      alert("Avaliação enviada com sucesso!");
      // Atualizar localmente a avaliação para refletir na UI
      setDisciplinasVinculadas((prev) =>
        prev.map((turma) =>
          turma.id === turmaId ? { ...turma, avaliacao } : turma
        )
      );
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      alert("Erro ao enviar avaliação.");
    }
  };

  return (
    <div className="accountsettings">
      <h1 className="mainhead1">Minhas Disciplinas</h1>
      <table className="tabeladisc" border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Nome da Disciplina</th>
            <th>Descrição</th>
            <th>Tutor</th>
            <th>Avaliação</th>
          </tr>
        </thead>
        <tbody>
          {disciplinasVinculadas.length > 0 ? (
            disciplinasVinculadas.map((turma) => (
              <tr key={turma.id}>
                <td>{turma.disciplina.nome}</td>
                <td>{turma.disciplina.descricao}</td>
                <td>{turma.tutor.nome}</td>
                <td>
                  {turma.avaliacao ? (
                    <span>Nota: {turma.avaliacao}/5</span>
                  ) : (
                    <div>
                      {[1, 2, 3, 4, 5].map((nota) => (
                        <button
                          key={nota}
                          onClick={() => handleAvaliacao(turma.id, nota)}
                          className="avaliacao-button"
                        >
                          {nota}
                        </button>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Você ainda não está vinculado a nenhuma disciplina.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MinhasDisciplinas;
