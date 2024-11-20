import React, { useEffect, useState } from "react";
import "./AccountSettings.css";
import api from "../services/api";


function AccountSettings() {
  // Estado para armazenar os dados do usuário
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    cpf: "",
  });

  const [loading, setLoading] = useState(true); // Para mostrar um "loading" enquanto os dados são carregados
  const [error, setError] = useState(null);

  

  // useEffect para buscar as informações do usuário quando o componente carregar
  useEffect(() => {
    async function fetchUserData() {
      try {
        const token = localStorage.getItem("authToken"); // Obter o token de autenticação
        console.log(token)
        const response = await api.get("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response)
        // Atualizar o estado com os dados do usuário
        setUserData({
          nome: response.data.nome,
          email: response.data.email,
          cpf: response.data.cpf,
        });
        setLoading(false);
      } catch (err) {
        console.log(err)
        setError("Erro ao carregar informações do usuário.");
        setLoading(false);
      }
    }

    fetchUserData();
  }, []); // Rodar apenas uma vez, quando o componente for montado

  // Função para lidar com mudanças nos inputs (nome, email, cpf)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Função para salvar as alterações do usuário
  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Obter o token novamente
      await api.put("/api/user/update", userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Informações atualizadas com sucesso!");
    } catch (error) {
      alert("Erro ao salvar as alterações.");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="accountsettings">
      <h1 className="mainhead1">Informação pessoal</h1>

      <div className="form">
        <div className="form-group">
          <label htmlFor="nome">
            Nome<span>*</span>
          </label>
          <input
            type="text"
            name="nome"
            id="nome"
            value={userData.nome}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">
            E-mail<span>*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpf">
            CPF<span>*</span>
          </label>
          <input
            type="text"
            name="cpf"
            id="cpf"
            value={userData.cpf}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleSaveChanges} className="accountsettingsbutton">Salvar mudanças</button>
      </div>
    </div>
  );
}



export default AccountSettings;
