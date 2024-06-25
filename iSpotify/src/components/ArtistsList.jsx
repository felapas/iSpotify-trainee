import React, { useEffect, useState } from "react";
import api from "../api";
import ArtistCard from "./ArtistCard";
import "./ArtistsList.css";

const ArtistsList = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await api.get("/artists");
        setArtists(response.data);
      } catch (error) {
        console.error("Erro ao buscar artistas:", error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div>
      <div className="artists-list">
        {artists.slice(0, 12).map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
};

export default ArtistsList;
