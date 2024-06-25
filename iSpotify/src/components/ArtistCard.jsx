
import { Link } from "react-router-dom";
import "./ArtistCard.css";

const ArtistCard = ({ artist }) => {
  return (
    <div className="artist-card">
      <div className="img-container">
        <img src={artist.image} alt={artist.name} className="artist-img" />
      </div>
      <div className="artist-info">
        <h4 className="artist-name">
          <Link to={`/artists/${artist.id}`} className="artist-link">
            {artist.name}
          </Link>
        </h4>
        <p>Artista</p>
      </div>
    </div>
  );
};

export default ArtistCard;
