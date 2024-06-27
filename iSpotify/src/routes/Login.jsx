import { useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", { email, password });

      if (response.status === 204) {
        setMessage("Login realizado com sucesso!");
        navigate("/artists");
      }
    } catch (error) {
      if (error.response) {
        setMessage(`${error.response.data}`);
      } else if (error.request) {
        setMessage("Erro na requisição: Sem resposta do servidor");
      } else {
        setMessage(`Erro: ${error.message}`);
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
      <h1 className="form-title">iSpotify &reg;</h1>
      <h2 className="slogan">Música para todos.</h2>
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
            placeholder="Senha"
            required
            className="account-field"
          />
          <span className="material-symbols-outlined input-icon">lock</span>
        </div>
        <div className="buttons-container">
          <button className="account-button white-btn" type="submit">
            ENTRAR
          </button>
        </div>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <div className="subscribe">
        <p>NÃO TEM UMA CONTA?</p>{" "}
        <Link to="/auth/register" className="auth-link">
          INSCREVA-SE
        </Link>
      </div>
    </div>
  );
};

export default Login;
