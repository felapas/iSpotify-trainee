import React, { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./Login.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
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
        const loginResponse = await api.post("/users/login", {
          email,
          password,
        });

        if (loginResponse.status === 204) {
          navigate("/artists");
        }
      }
    } catch (error) {
      if (error.response) {
        setMessage(`Erro ao criar usuário: ${error.response.data}`);
      } else {
        setMessage("Erro ao criar usuário");
      }
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        Inscrever-se em uma <br /> conta grátis do
        <br /> iSpotify&reg;
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="account-field"
          />
          <span className="material-symbols-outlined input-icon">mail</span>
        </div>
        <div className="input-container">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Crie uma senha"
            required
            className="account-field"
          />
          <span className="material-symbols-outlined input-icon">lock</span>
        </div>
        <div className="input-container">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Como devemos chamar você?"
            required
            className="account-field"
          />
          <span className="material-symbols-outlined input-icon">
            account_circle
          </span>
        </div>
        <div className="buttons-container">
          <button type="submit" className="account-button green-btn">
            CADASTRAR
          </button>
        </div>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <div className="subscribe">
        <p>Já é um usuário do iSpotify?</p>
        <Link to="/auth/login" className="auth-link">
          FAÇA LOGIN
        </Link>
      </div>
    </div>
  );
};

export default Register;
