import React from "react";
import api from "../api";
import "./PlaylistSongs.css";

const PlaylistSongs = ({ artist, songs }) => {
  const handleFavorite = async (songId) => {
    try {
      const response = await api.post(`/users-songs/${songId}`);
      if (response.status === 201) {
        console.log("Song favorited successfully");
      }
    } catch (error) {
      console.error("Erro ao favoritar a música:", error);
    }
  };

  return (
    <div className="artist-songs">
      <div className="labels">
        <p className="label-title"># TÍTULO</p>
        <p>Gênero</p>
        <span className="material-symbols-outlined label-action">schedule</span>
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
                <span
                  className="material-symbols-outlined btn-favorite-song"
                  onClick={() => handleFavorite(song.id)}
                >
                  favorite
                </span>
                <span className="material-symbols-outlined btn-delete">
                  delete
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistSongs;
