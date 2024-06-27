import React from "react";
import "./PlaylistSongs.css";

const PlaylistSongs = ({ songs, onFavoriteToggle, onDeleteFavorite }) => {
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
          <div key={song.id} className="song-card">
            <div className="song-info">
              <div className="song-info_titles">
                <div className="song-info_titles-inde">
                  <p>{index + 1}</p>
                </div>
                <div className="song-info_titles-text">
                  <h4>{song.title}</h4>
                  <p>{song.artistName}</p>
                </div>
              </div>
              <p>{song.genre}</p>
              <div className="song-actions">
                <span
                  className={`material-symbols-outlined btn-favorite-song ${
                    song.isFavorite ? "favorite-active" : ""
                  }`}
                  onClick={() => onFavoriteToggle(song.id)}
                >
                  favorite
                </span>
                {onDeleteFavorite && (
                  <span
                    className="material-symbols-outlined btn-delete"
                    onClick={() => onDeleteFavorite(song.id)}
                  >
                    delete
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistSongs;
