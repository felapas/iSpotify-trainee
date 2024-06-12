import React, { useState } from "react";
import api from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        setMessage("Login realizado com sucesso!");
        const token = response.data.token;
        localStorage.setItem("authToken", token); // Salvar token no localStorage
      } else {
        setMessage("Falha no login");
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
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
