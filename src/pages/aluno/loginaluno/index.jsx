import api from "../../../services/api";
import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom"; // Importar Link para navegação
import "./style.css";

function LoginAluno() {
  const inputEmail = useRef();
  const inputSenha = useRef();
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const response = await api.post("/login", {
        email: inputEmail.current.value,
        senha: inputSenha.current.value,
        tipoUsuario: "aluno",
      });

      if (response.status === 200) {
        localStorage.setItem('authToken', response.data);
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
      <button className="loginbutton" onClick={handleLogin}>Entrar</button>
      
      {/* Botão de Recuperar Senha */}
      <div className="forgot-password">
        <Link to="/recover-password" className="forgot-password-link">
          Esqueceu sua senha?
        </Link>
      </div>
    </div>
  );
}

export default LoginAluno;
