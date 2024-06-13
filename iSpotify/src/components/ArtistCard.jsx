import React from "react";

import "./ArtistCard.css"

const ArtistCard = ({ artist }) => {
  return (
    <div className="artist-card">
      <div className="img-container">
        <img src={artist.image} alt={artist.name} className="artist-img" />
      </div>
      <div className="artist-info">
        <h4 className="artist-name">{artist.name}</h4>
        <p>Artista</p>
      </div>
    </div>
  );
};

export default ArtistCard;
