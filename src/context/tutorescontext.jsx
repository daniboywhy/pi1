import React, { createContext, useState, useContext } from 'react';

// Cria o contexto
const TutorContext = createContext();

// Hook para usar o contexto de Tutores
export const useTutores = () => {
    return useContext(TutorContext);
};

// Provider para envolver o aplicativo
export const TutorProvider = ({ children }) => {
    const [listaTutores, setListaTutores] = useState([]);

    // Função para atualizar a lista de tutores
    const atualizarTutores = (tutores) => {
        setListaTutores(tutores);
    };

    // Função para adicionar um novo tutor
    const adicionarTutor = (tutor) => {
        setListaTutores(prevTutores => [...prevTutores, tutor]);
    };

    // Função para remover um tutor por ID
    const removerTutor = (id) => {
        setListaTutores(prevTutores => prevTutores.filter(tutor => tutor.id !== id));
    };

    return (
        <TutorContext.Provider value={{ listaTutores, atualizarTutores, adicionarTutor, removerTutor }}>
            {children}
        </TutorContext.Provider>
    );
};
