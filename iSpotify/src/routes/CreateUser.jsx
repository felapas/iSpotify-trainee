import React, { useState } from "react";
import api from "../api";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/users", {
        name,
        email,
        password,
        role,
      });
      
      if (response.status === 201) {
        setMessage("Usuário criado com sucesso!");
      }
    } catch (error) {
      if (error.response) {
        setMessage(`Erro na resposta da API: ${error.response.data.msg}`);
      } else if (error.request) {
        setMessage("Erro na requisição: Sem resposta do servidor");
      } else {
        setMessage(`Erro: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h2>Criar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Criar Usuário</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateUser;
