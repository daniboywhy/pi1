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
        console.error('Erro ao buscar turmas:', error);
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

    try {
      await api.post('/turma', {
        tutorId: selectedTutor,
        disciplinaId: selectedDisciplina,
        alunoId: aluno.id,
        dataAula: selectedDate, // Envia a data selecionada
      });
      alert('Ingressou na disciplina com sucesso!');
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao ingressar na disciplina:', error);
      alert('Falha ao ingressar na disciplina.');
    }
  };

  return (
    <div>
      <h1>Lista de Professores e Disciplinas</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Nome do Professor</th>
            <th>Disciplinas Ministradas</th>
          </tr>
        </thead>
        <tbody>
          {tutores.map((tutor) => (
            <tr key={tutor.id}>
              <td>
                <strong>{tutor.nome}</strong>
              </td>
              <td>
                <ul>
                  {tutor.disciplinas.map((disciplina, index) => (
                    <li key={index}>
                      {disciplina.nome}
                      <button
                        onClick={() => handleOpenModal(tutor.id, tutor.disciplinaIDs[index])}
                        style={{ marginLeft: '10px' }}
                      >
                        Ingressar
                      </button>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
              dateFormat="Pp"
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
