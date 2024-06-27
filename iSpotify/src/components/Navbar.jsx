
import "./Navbar.css"
import { Link } from "react-router-dom";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
const handleLogout = async () => {
    

    try {
      const response = await api.post(`/users/logout`);
      if (response.status == 204) {
        navigate("/artists")
      }
    } 
    
    
    
    catch (error) {
      console.error("Erro ao fazer logout", error);
      
    }

    
  };
  

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
        <div className="navbar-options">
          <span className="material-symbols-outlined">account_circle</span>
          <h3>
            <Link to="conta" className="navbar-link">
              Minha Conta
            </Link>
          </h3>
        </div>
      </div>
      <div className="bottom-part">
        <div className="navbar-options">
          <span className="material-symbols-outlined">logout</span>
          <button  className="logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar