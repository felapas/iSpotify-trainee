import React, { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

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
        
        const token = response.data.token;
        localStorage.setItem("authToken", token);

        
        navigate("/artists");
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  return (
    <div>
      <h2>Inscrever-se em uma conta grátis do iSpotify&reg;</h2>
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
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Crie uma senha"
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Como devemos chamar você?"
            required
          />
        </div>
        <button type="submit">CADASTRAR</button>
      </form>
      <p>Já é um usuário do iSpotify?</p>{" "}
      <Link to="/auth/login">FAÇA LOGIN</Link>
    </div>
  );
};

export default Register;
