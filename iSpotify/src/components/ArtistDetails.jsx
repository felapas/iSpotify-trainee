import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import "./ArtistDetails.css";

const ArtistDetails = () => {
  const { id } = useParams(); 
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        const response = await api.get(`/artists/${id}`);
        setArtist(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do artista:", error);
      }
    };

    fetchArtistDetails();
  }, [id]);

  if (!artist) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="artist-details">
      <div className="artist-details_img">
        <img src={artist.image} alt={artist.name} />
      </div>
      <div className="artist-details_title">
        <h3>Artista</h3>
        <h2>{artist.name}</h2>
      </div>
    </div>
  );
};

export default ArtistDetails;
