import "./Navbar.css"

const Navbar = () => {
  return (
    <div className="sidebar">
      <h1>iSpotify &reg;</h1>
      <div className="navbar-options">
        <span class="material-symbols-outlined">album</span> <h3>Artistas</h3>
      </div>
      <div className="navbar-options">
        <span class="material-symbols-outlined">favorite</span>
        <h3>Musicas Curtidas</h3>
      </div>
    </div>
  );
}

export default Navbar