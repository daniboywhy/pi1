import api from "../../../services/api";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Login() {
  const inputEmail = useRef();
  const inputSenha = useRef();
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const response = await api.post("/login", {
        email: inputEmail.current.value,
        password: inputSenha.current.value,
        tipoUsuario: "aluno",
      });

      if (response.status = (200)) {
        navigate("/profile");
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
    </div>
  );
}

export default Login;
