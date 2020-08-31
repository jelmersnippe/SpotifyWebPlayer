import React from "react";
import { Link } from "react-router-dom";
import "./SongItem.scss";
import SpotifyWebApi from "spotify-web-api-js";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

function SongItem({
  track,
  showNumber = false,
  showArt = true,
  showArtistAlbum = true,
  context_uri,
}) {
  const spotify = new SpotifyWebApi();

  function playTrack() {
    spotify
      .play({
        context_uri: context_uri,
        offset: {
          uri: track.uri,
        },
        position_ms: 0,
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="song-item" onDoubleClick={() => playTrack()}>
      <PlayArrowIcon className="icon play" onClick={() => playTrack()} />
      <div className="track-info">
        {showArt && (
          <img className="track-art" src={track.album.images[2].url} alt="" />
        )}
        {showNumber && <div className="number">{track.track_number}.</div>}
        <div className="text">
          <div className="title">{track.name}</div>

          {showArtistAlbum && (
            <div className="artist-album">
              <div className="artist">
                {track.artists.reduce((initial, artist) => {
                  if (initial !== "") {
                    initial += ", ";
                  }
                  initial += artist.name;
                  return initial;
                }, "")}
              </div>
              <span> - </span>
              <Link className="album" to={`/album/${track.album.id}`}>
                {track.album.name}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SongItem;
