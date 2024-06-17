import { useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import "./Login.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    
  };

  return (
    <div>
      <h1 className="logo-login">iSpotify &reg;</h1>
      <h2 className="slogan">Música para todos.</h2>
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
        <button type="submit">ENTRAR</button>
      </form>
      <div className="subscribe">
        <p>NÃO TEM UMA CONTA?</p> <Link to="/auth/register">INSCREVA-SE</Link>
      </div>
    </div>
  );
};

export default Login;
