import React, { useState, useEffect } from "react";
import api from "../api";
import PlaylistDetails from "../components/PlaylistDetails";
import PlaylistSongs from "../components/PlaylistSongs";
import { Link } from "react-router-dom";
import "./LikedSongs.css";

const LikedSongs = () => {
  const [songs, setSongs] = useState([]);
  const [artist, setArtist] = useState({
    name: "Músicas Curtidas",
    image:
      "https://www.figma.com/file/fbDqxRfwkno2CvrfX1Ff0O/image/42ff2f29db5e4ded8bef7f9b90d54e9e9b24c63d",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      const likedSongsIds =
        JSON.parse(localStorage.getItem("likedSongs")) || [];

      try {
        const songRequests = likedSongsIds.map((id) => api.get(`/songs/${id}`));
        const songsData = await Promise.all(songRequests);

        const songsWithArtistsRequests = songsData.map((song) =>
          api.get(`/artists/${song.data.artist_id}`).then((artistData) => ({
            ...song.data,
            artistName: artistData.data.name,
            isFavorite: true,
          }))
        );

        const songsWithArtists = await Promise.all(songsWithArtistsRequests);

        setSongs(songsWithArtists);
      } catch (error) {
        console.error("Erro ao buscar músicas favoritas do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const toggleFavorite = (songId) => {
    const likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];
    const isFavorite = likedSongs.includes(songId);
    const updatedLikedSongs = isFavorite
      ? likedSongs.filter((id) => id !== songId)
      : [...likedSongs, songId];

    localStorage.setItem("likedSongs", JSON.stringify(updatedLikedSongs));
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId ? { ...song, isFavorite: !song.isFavorite } : song
      )
    );
  };

  if (loading) {
    return (
      <div className="loading-liked">
        <p className="loading-text">Carregando...</p>
        <span className="material-symbols-outlined loading-symbol">sync</span>
      </div>
    );
  }

  const likedSongsList = songs.filter((song) => song.isFavorite);

  return (
    <div className="artistpage-container liked-background">
      <PlaylistDetails artist={artist} type="Playlist" />
      <div className="music-controls">
        <span className="material-symbols-outlined btn-play-circle">
          play_circle
        </span>
        <span className="material-symbols-outlined btn-favorite">favorite</span>
        <span className="material-symbols-outlined btn-download">download</span>
        <span className="material-symbols-outlined btn-more">more_horiz</span>
      </div>
      {likedSongsList.length === 0 ? (
        <div className="no-favorite-container">
          <h2 className="no-favorite-text">
            VOCÊ NÃO TEM MÚSICAS CURTIDAS... AINDA!
          </h2>
          <Link to="/artists" className="no-favorite-link">
            ENCONTRE SEUS ARTISTAS FAVORITOS!
          </Link>
        </div>
      ) : (
        <PlaylistSongs
          songs={likedSongsList}
          onFavoriteToggle={toggleFavorite}
        />
      )}
    </div>
  );
};

export default LikedSongs;
