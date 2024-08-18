import React, { createContext, useState, useContext } from 'react';

// Cria o contexto
const AlunosContext = createContext();

// Hook para usar o contexto de Alunos
export const useAlunos = () => {
    return useContext(AlunosContext);
};

// Provider para envolver o aplicativo
export const AlunosProvider = ({ children }) => {
    const [listaAlunos, setListaAlunos] = useState([]);

    // Função para atualizar a lista de alunos
    const atualizarAlunos = (alunos) => {
        setListaAlunos(alunos);
    };

    // Função para adicionar um novo aluno
    const adicionarAluno = (aluno) => {
        setListaAlunos(prevAlunos => [...prevAlunos, aluno]);
    };

    // Função para remover um aluno por ID
    const removerAluno = (id) => {
        setListaAlunos(prevAlunos => prevAlunos.filter(aluno => aluno.id !== id));
    };

    return (
        <AlunosContext.Provider value={{ listaAlunos, atualizarAlunos, adicionarAluno, removerAluno }}>
            {children}
        </AlunosContext.Provider>
    );
};
