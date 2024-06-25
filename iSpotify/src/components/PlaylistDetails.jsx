
import "./PlaylistDetails.css";

const PlaylistDetails = ({artist, type}) => {


  return (
    <div className="artist-details">
      <div className="artist-details_img">
        <img src={artist.image} alt={artist.name} />
      </div>
      <div className="artist-details_title">
        <h3>{type}</h3>
        <h2>{artist.name}</h2>
      </div>
    </div>
  );
};

export default PlaylistDetails;
