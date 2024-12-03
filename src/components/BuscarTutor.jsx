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
  
    const formattedDate = selectedDate.toISOString();
  
    try {
      // Criação da turma
      const response = await api.post('/turma', {
        tutorId: selectedTutor,
        disciplinaId: selectedDisciplina,
        alunoId: aluno.id,
        dataAula: formattedDate,
      });
  
      console.log('Turma criada com sucesso:', response.data);
  
      // Fechar o modal
      setShowModal(false);
  
      // Realizar o checkout
      handleCheckout();
    } catch (error) {
      console.error('Erro ao criar turma:', error);
      alert('Falha ao ingressar na disciplina.');
    }
  };
  
  const handleCheckout = async () => {
    try {
      const response = await api.post('/checkout', {
        nome: aluno.nome, 
        email: aluno.email,
        valor: 1, // Valor em centavos
      });
  
      console.log("URL de pagamento recebida:", response.data.url);
  
      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        alert('Erro ao processar o pagamento. URL não encontrada.');
      }
    } catch (error) {
      console.error('Erro ao criar sessão de pagamento:', error);
      alert('Falha ao iniciar o pagamento.');
    }
  };
  
  

  return (
    <div className="tutor-grid">
      {tutores
        .filter((tutor) => tutor.disciplinas && tutor.disciplinas.length > 0)
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
              dateFormat="yyyy-MM-dd HH:mm:ss"
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
