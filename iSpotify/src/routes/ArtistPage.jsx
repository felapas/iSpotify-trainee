
import ArtistDetails from "../components/ArtistDetails"
import ArtistSongs from "../components/ArtistSongs"
import "./ArtistPage.css"


const ArtistPage = () => {
  
  

  return (
    <div className="artistpage-container">
      <ArtistDetails />
      <div className="music-controls">
        <span className="material-symbols-outlined btn-play-circle">
          play_circle
        </span>
        <span className="material-symbols-outlined btn-favorite">favorite</span>
        <span className="material-symbols-outlined btn-download">download</span>
        <span className="material-symbols-outlined btn-more">more_horiz</span>
      </div>
      <ArtistSongs />
    </div>
  );
};

export default ArtistPage;
