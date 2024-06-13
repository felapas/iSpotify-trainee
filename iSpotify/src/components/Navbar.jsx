import "./Navbar.css"
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="sidebar">
      <div className="top-part">
        <h1 className="logo">iSpotify &reg;</h1>
        <div className="navbar-options">
          <span className="material-symbols-outlined">album</span>{" "}
          <h3>
            <Link to="artists" className="navbar-link">
              Artistas
            </Link>
          </h3>
        </div>
        <div className="navbar-options">
          <span className="material-symbols-outlined">favorite</span>
          <h3>
            <Link to="curtidas" className="navbar-link">
              Musicas Curtidas
            </Link>
          </h3>
        </div>
      </div>
      <div className="bottom-part">
        <div className="navbar-options">
          <span className="material-symbols-outlined">login</span>
          <Link to="login" className="login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar