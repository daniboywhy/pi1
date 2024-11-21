import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './BuscarTutor.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ListarTutor = ({ alunoId }) => {
  const [aluno, setAluno] = useState([]);
  const [tutores, setTutores] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [selectedDisciplina, setSelectedDisciplina] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await api.get('/api/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAluno(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao buscar aluno:', error);
      }
    };

    const fetchTutores = async () => {
      try {
        const response = await api.get('/tutordisciplinas');
        setTutores(response.data);
      } catch (error) {
        console.error('Erro ao buscar tutores:', error);
      }
    };

    fetchAluno();
    fetchTutores();
  }, []);

  const handleOpenModal = (tutorId, disciplinaId) => {
    setSelectedTutor(tutorId);
    setSelectedDisciplina(disciplinaId);
    setShowModal(true);
  };

  const handleConfirm = async () => {
    if (!selectedDate) {
      alert('Por favor, selecione uma data e hora.');
      return;
    }

    // Converte a data para string no formato local
    const formattedDate = selectedDate.toISOString(); // Converte para o formato ISO (2024-11-20T14:30:00.000Z)

    try {
      const response = await api.post('/turma', {
        tutorId: selectedTutor,
        disciplinaId: selectedDisciplina,
        alunoId: aluno.id,
        dataAula: formattedDate, // Envia a data formatada
      });
      alert('Ingressou na disciplina com sucesso!');
      console.log('Resposta da API:', response.data); // Verificar o que está retornando
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao ingressar na disciplina:', error);
      alert('Falha ao ingressar na disciplina.');
    }
  };

  return (
    <div className="tutor-grid">
      {tutores
        .filter((tutor) => tutor.disciplinas && tutor.disciplinas.length > 0) // Filtra tutores com disciplinas
        .map((tutor) => (
          <div key={tutor.id} className="tutor-card">
            <h3>{tutor.nome}</h3>
            <div className="disciplinas">
              {tutor.disciplinas.map((disciplina, index) => (
                <div key={index} className="disciplina-item">
                  {disciplina.nome}
                  <button
                    className="ingressar-button"
                    onClick={() => handleOpenModal(tutor.id, tutor.disciplinaIDs[index])}
                  >
                    Ingressar
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

      {/* Modal para selecionar data e hora */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Escolha uma data e hora para a aula</h2>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm:ss" // Formato mais legível
              placeholderText="Selecione data e hora"
            />
            <div style={{ marginTop: '20px' }}>
              <button onClick={handleConfirm}>Confirmar</button>
              <button onClick={() => setShowModal(false)} style={{ marginLeft: '10px' }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListarTutor;
