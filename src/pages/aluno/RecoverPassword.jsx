// src/pages/aluno/RecoverPassword.jsx
import React, { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../background.jpg'; 
import "./recoverpassword.css";

function RecoverPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handlePasswordRecovery() {
    try {
      const response = await api.post("/recover-password", { email });
      if (response.status === 200) {
        alert("Verifique seu e-mail para as instruções de recuperação.");
        navigate("/login");
      } else {
        alert("Erro ao tentar recuperar a senha. Verifique se o e-mail está correto.");
      }
    } catch (error) {
      console.error("Erro ao tentar recuperar a senha:", error);
      alert("Erro ao tentar recuperar a senha.");
    }
  }

  return (
    <div className="bg-img" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container">
        <h1>Recuperar Senha</h1>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handlePasswordRecovery}>Enviar</button>
      </div>
    </div>
  );
}

export default RecoverPassword;
