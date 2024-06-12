import React from "react";

import "./ArtistCard.css"

const ArtistCard = ({ artist }) => {
  return (
    <div className="artist-card">
      <img src={artist.image} alt={artist.name} className="artist-img" />
      <h4 className="artist-name">{artist.name}</h4>
      <p>Artista</p>
    </div>
  );
};

export default ArtistCard;
