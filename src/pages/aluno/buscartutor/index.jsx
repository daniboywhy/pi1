import React, { useState, useEffect } from 'react';
import { useTutores } from '../../../context/tutorescontext';

function BuscarTutor() {
  const { listaTutores } = useTutores(); // Acessa a lista de tutores do contexto
  const [filteredTutores, setFilteredTutores] = useState(listaTutores); // Estado para armazenar a lista filtrada
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de busca

  // Função para filtrar tutores com base no termo de busca
  useEffect(() => {
    const results = listaTutores.filter(tutor =>
      tutor.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTutores(results);
  }, [searchTerm, listaTutores]); // Atualiza a lista filtrada quando o termo de busca ou a lista de tutores muda

  return (
    <div>
      <h1>Buscar Professores</h1>
      <input
        type="text"
        placeholder="Buscar por nome..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredTutores.map(tutor => (
          <li key={tutor.id}>{tutor.nome} - {tutor.cpf}</li>
        ))}
      </ul>
    </div>
  );
}

export default BuscarTutor;
