import { useEffect, useState, useRef } from "react";
import "./style.css";
import api from '../../services/api';

// react hook - use ref

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef()
  const inputCpf = useRef()
  const inputUser = useRef()
  const inputSenha = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/aluno');
    setUsers(usersFromApi.data);
    console.log('Data fetched:', usersFromApi.data); // Agora você verá os dados corretamente
  }

  async function createUsers() {
    await api.post('/aluno', {
      usuario: inputUser.current.value,
      senha: inputUser.current.value,
      nome: inputName.current.value,
      cpf: inputCpf.current.value,
    });
    getUsers()
  }

  async function deleteUsers(id) {
    await api.delete(`/aluno/${id}`)
    getUsers()
  }


  useEffect(() => {
    getUsers(); // Chama getUsers uma vez na montagem do componente
  }, []); // Array de dependências vazio, para rodar apenas uma vez

  return (
    <div className="container">
      <form action="">
        <h1>Cadastro de Usuários</h1>
        <input placeholder="nome" name='nome' type="text" ref={inputName}/>
        <input placeholder="cpf" name='cpf' type="number" ref={inputCpf}/>
        <input placeholder="usuário" name='usuário' type="text" ref={inputUser}/>
        <input placeholder="senha" name='senha' type="password" ref={inputSenha}/>
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.nome}</span></p>
            <p>Cpf: <span>{user.cpf}</span></p>
            <p>Usuário: <span>{user.usuario}</span></p>
          </div>
          <button onClick= {() => deleteUsers(user.id)}>
            <img src="" alt="apaga" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
