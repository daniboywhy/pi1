import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./AlunoTurmas.css";

const MinhasDisciplinas = () => {
  const [aluno, setAluno] = useState({});
  const [disciplinasVinculadas, setDisciplinasVinculadas] = useState([]);

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await api.get("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAluno(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do aluno:", error);
      }
    };

    const fetchDisciplinasVinculadas = async () => {
      let alunoId = aluno.id;
      try {
        const response = await api.get(`/aluno/${alunoId}/minhas-disciplinas`);
        setDisciplinasVinculadas(response.data);
      } catch (error) {
        console.error("Erro ao buscar disciplinas vinculadas:", error);
      }
    };

    fetchAluno();
    if (aluno.id) fetchDisciplinasVinculadas();
  }, [aluno.id]);

  const handleAvaliacao = async (turmaId, avaliacao) => {
    try {
      await api.put(`/turma/${turmaId}/avaliacao`, { avaliacao });
      alert("Avaliação enviada com sucesso!");
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
      <div className="disciplinas-container">
        {disciplinasVinculadas.length > 0 ? (
          disciplinasVinculadas.map((turma) => (
            <div key={turma.id} className="disciplina-card">
              <h3>{turma.disciplina.nome}</h3>
              <p>{turma.disciplina.descricao}</p>
              <p><strong>Tutor:</strong> {turma.tutor.nome}</p>
              <div className="avaliacao">
                {turma.avaliacao ? (
                  <span className="nota">Nota: {turma.avaliacao}/5</span>
                ) : (
                  <div className="estrelas">
                    {[1, 2, 3, 4, 5].map((nota) => (
                      <button
                        key={nota}
                        onClick={() => handleAvaliacao(turma.id, nota)}
                        className="estrela-button"
                      >
                        ★
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Você ainda não está vinculado a nenhuma disciplina.</p>
        )}
      </div>
    </div>
  );
};

export default MinhasDisciplinas;
