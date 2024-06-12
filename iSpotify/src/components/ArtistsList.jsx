import React, { useEffect, useState } from "react";
import artistsData from "../artists";
import ArtistCard from "./ArtistCard";
import "./ArtistsList.css"

const ArtistsList = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    // Simular uma chamada de API
    setArtists(artistsData);
  }, []);

  return (
    <div>
      <div className="artists-list">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
};

export default ArtistsList;
