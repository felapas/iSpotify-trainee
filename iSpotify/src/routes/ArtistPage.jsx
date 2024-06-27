import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import PlaylistDetails from "../components/PlaylistDetails";
import PlaylistSongs from "../components/PlaylistSongs";
import "./ArtistPage.css";

const ArtistPage = () => {
  const { id } = useParams();
  const [songs, setSongs] = useState([]);
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchArtistSongs = async () => {
      try {
        const response = await api.get(`/songs/artist/${id}`);
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

  if (!songs.length || !artist) {
    return (
      <div className="loading-artist">
        <p className="loading-text">Carregando...</p>
        <span className="material-symbols-outlined loading-symbol">sync</span>
      </div>
    );
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
      <PlaylistSongs songs={songs} onFavoriteToggle={toggleFavorite} />
    </div>
  );
};

export default ArtistPage;
