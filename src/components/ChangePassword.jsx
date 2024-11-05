import React from "react";
import { useState, useEffect } from "react";
import api from "../services/api";

const ChangePassword = () => {

  const [userSenha, setUserSenha] = useState({
    email: "",
    senhaAtual: "",
    novaSenha: "",
    tipoUsuario: "",
    confirmarNovaSenha: ""
  });
  

  const [loading, setLoading] = useState(true); // Para mostrar um "loading" enquanto os dados são carregados
  const [error, setError] = useState(null);

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
        setUserSenha(prev => {

          return {
            ...prev,
            tipoUsuario: response.data.tipoUsuario

          }
          
        });
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar informações do usuário.");
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserSenha((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    if (userSenha.novaSenha !== userSenha.confirmarNovaSenha) {
      alert("A nova senha e a confirmação da senha não coincidem.");
      return; // Interrompe o fluxo se as senhas não forem iguais
    }
    try {
      const token = localStorage.getItem("authToken"); // Obter o token novamente
      await api.put("/redefinir-senha", userSenha, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Informações atualizadas com sucesso!");
    } catch (error) {
      console.log(error)
      alert("Erro ao salvar as alterações.");
    }
  };


  return (
    <div className="accountsettings">
      <h1 className="mainhead1">Mude sua senha</h1>

      <div className="form">
         <div className="form-group">
          <label htmlFor="oldpassword">
            Confirme seu e-mail<span>*</span>
          </label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={userSenha.email}
            onChange={handleInputChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="oldpassword">
            Senha antiga<span>*</span>
          </label>
          <input 
            type="password" 
            name="senhaAtual" 
            id="oldpassword" 
            value={userSenha.senhaAtual}
            onChange={handleInputChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="newpassword">
            Nova senha<span>*</span>
          </label>
          <input 
            type="password"
            name="novaSenha"
            id="newpassword"
            value={userSenha.novaSenha}
            onChange={handleInputChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="newpasswordconfirm">
            Confirme sua nova senha<span>*</span>
          </label>
          <input
            type="password"
            name="confirmarNovaSenha"
            id="newpasswordconfirm"
            value={userSenha.confirmarNovaSenha}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleSaveChanges} className="mainbutton1">Salvar mudanças</button>
      </div>
    </div>
  );
};

export default ChangePassword;
