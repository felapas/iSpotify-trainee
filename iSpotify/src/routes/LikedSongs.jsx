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
      try {
        const response = await api.get("/songs");
        const songsData = response.data;

        const likedSongsIds =
          JSON.parse(localStorage.getItem("likedSongs")) || [];
        const songsWithFavoriteStatus = songsData.map((song) => ({
          ...song,
          isFavorite: likedSongsIds.includes(song.id),
        }));

        const artistRequests = songsWithFavoriteStatus.map((song) =>
          api.get(`/artists/${song.artist_id}`)
        );
        const artistsData = await Promise.all(artistRequests);

        const songsWithArtists = songsWithFavoriteStatus.map((song, index) => ({
          ...song,
          artistName: artistsData[index].data.name,
        }));

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

  const likedSongsList = songs.filter((song) => song.isFavorite);

  if (loading) {
    return (
      <div className="loading-liked">
        <p className="loading-text">Carregando...</p>
        <span className="material-symbols-outlined loading-symbol">sync</span>
      </div>
    );
  }

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
      {likedSongsList.length == 0 ? (
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
