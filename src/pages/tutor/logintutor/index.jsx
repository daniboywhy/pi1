import api from "../../../services/api";
import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom"; // Importar Link para navegação
import "./style.css";

function LoginTutor() {
  const inputEmail = useRef();
  const inputSenha = useRef();
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const response = await api.post("/login", {
        email: inputEmail.current.value,
        password: inputSenha.current.value,
        tipoUsuario: "tutor",
      });

      if ((response.status = 200)) {
        navigate("/profile/accountsettings");
      } else {
        alert("Credenciais inválidas!");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login!");
    }
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <input ref={inputEmail} placeholder="E-mail" />
      <input ref={inputSenha} placeholder="Senha" type="password" />
      <button onClick={handleLogin}>Entrar</button>

      <div className="forgot-password">
        <Link to="/recover-password" className="forgot-password-link">
          Esqueceu sua senha?
        </Link>
      </div>
      
    </div>
    
  );
}

export default LoginTutor;
