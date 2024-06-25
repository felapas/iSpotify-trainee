import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import "./ArtistSongs.css";

const ArtistSongs = () => {
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
    <div className="artist-songs">
      <div className="labels">
        <p className="label-title"># TÍTULO</p>
        <p>Gênero</p>
        <span class="material-symbols-outlined label-action">schedule</span>
      </div>
      <hr />
      <div className="songs-list">
        {songs.map((song, index) => (
          <div key={song.title} className="song-card">
            <div className="song-info">
              <div className="song-info_titles">
                <div className="song-info_titles-inde">
                  <p>{index + 1}</p>
                </div>
                <div className="song-info_titles-text">
                  <h4>{song.title}</h4>
                  <p>{artist.name}</p>
                </div>
              </div>
              <p>{song.genre}</p>
              <div className="song-actions">
                <span className="material-symbols-outlined btn-favorite-song">
                  favorite
                </span>
                <span class="material-symbols-outlined btn-delete">delete</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default ArtistSongs;
