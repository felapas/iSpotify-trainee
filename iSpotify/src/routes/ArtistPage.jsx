import PlaylistDetails from "../components/PlaylistDetails";
import PlaylistSongs from "../components/PlaylistSongs";
import "./ArtistPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const ArtistPage = () => {
  const { id } = useParams();
  const [songs, setSongs] = useState([]);
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchArtistSongs = async () => {
      try {
        const response = await api.get(`/songs/artist/${id}`);
        setSongs(response.data);
      } catch (error) {
        console.error("Erro ao buscar músicas do artista:", error);
      }
    };
    const fetchArtistDetails = async () => {
      try {
        const response = await api.get(`/artists/${id}`);
        setArtist(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do artista:", error);
      }
    };

    fetchArtistDetails();
    fetchArtistSongs();
  }, [id]);

  if (!songs.length || !artist) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="artistpage-container">
      <PlaylistDetails artist={artist} type="Artista" />
      <div className="music-controls">
        <span className="material-symbols-outlined btn-play-circle">
          play_circle
        </span>
        <span className="material-symbols-outlined btn-favorite">favorite</span>
        <span className="material-symbols-outlined btn-download">download</span>
        <span className="material-symbols-outlined btn-more">more_horiz</span>
      </div>
      <PlaylistSongs artist={artist} songs={songs} />
    </div>
  );
};

export default ArtistPage;
