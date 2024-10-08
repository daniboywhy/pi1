import React, { useEffect, useState } from "react";
import "./UserSidebar.css";
import { Link } from "react-router-dom";

const UserSidebar = ({ activepage }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    cpf: "",
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const token = localStorage.getItem("authToken"); // Obter o token de autenticação
        const response = await axios.get("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Atualizar o estado com os dados do usuário
        setUserData({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          cpf: response.data.cpf,
        });
        setLoading(false);
      } catch (err) {}
    }

    fetchUserData();
  }, []); // Rodar apenas uma vez, quando o componente for montado

  async function deleteUsers(id) {
    try {
      await api.delete(`/aluno/${id}`);
      getUsers(); // Atualiza a lista de usuários

      removerAluno(id);
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      alert("Erro ao deletar usuário!");
    }
  }

  return (
    <div className="usersidebar">
      {activepage === "accountsettings" ? (
        <div className="s2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <span>Account Settings</span>
        </div>
      ) : (
        <Link to="/profile/accountsettings" className="stylenone">
          <div className="s1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <span>Account Settings</span>
          </div>
        </Link>
      )}
      {activepage === "changepassword" ? (
        <div className="s2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
          <span>Change Password</span>
        </div>
      ) : (
        <Link to="/profile/changepassword" className="stylenone">
          <div className="s1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
            <span>Change Password</span>
          </div>
        </Link>
      )}
      <div className="sidebar-item">
        <Link to="/profile/disciplinas" className="sidebar-link">
          <div className={activepage === "disciplinas" ? "active" : ""}>
            <svg viewBox="0 0 24 24" className="size-6">
              <path d="M4 6H2v16c0 1.1.9 2 2 2h16v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"></path>
            </svg>
            <span>Disciplinas</span>
          </div>
        </Link>
      </div>
      <div className="sidebar-item delete-account">
        <button
          className="delete-button"
          onClick={() => {
            if (
              window.confirm(
                "Tem certeza que deseja excluir sua conta? Essa ação é irreversível!"
              )
            ) {
              // Lógica para deletar a conta aqui, por exemplo:
              deleteUsers(userData.id);
              // deleteUserAccount();
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19 7l-.867 12.142A2 2 0 0116.137 21H7.863a2 2 0 01-1.996-1.858L5 7M10 11v6m4-6v6M4 7h16M9 4h6a1 1 0 011 1v1H8V5a1 1 0 011-1z"
            />
          </svg>
          <span>Excluir Conta</span>
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
