import React from "react";
import "./SongItem.scss";
import SpotifyWebApi from "spotify-web-api-js";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

function SongItem({ track, context_uri }) {
  const spotify = new SpotifyWebApi();

  function playTrack() {
    spotify
      .play({
        context_uri: context_uri,
        offset: {
          uri: track.track.uri,
        },
        position_ms: 0,
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="song-item" onDoubleClick={() => playTrack()}>
      <div className="track-info">
        <img
          className="track-art"
          src={track.track.album.images[2].url}
          alt=""
        />
        <div className="text">
          <div className="title">{track.track.name}</div>
          <div className="artist-album">
            <div className="artist">
              {track.track.artists.reduce((initial, artist) => {
                if (initial !== "") {
                  initial += ", ";
                }
                initial += artist.name;
                return initial;
              }, "")}
            </div>
            <span> - </span>
            <div className="album">{track.track.album.name}</div>
          </div>
        </div>
      </div>
      <PlayArrowIcon className="icon play" onClick={() => playTrack()} />
    </div>
  );
}

export default SongItem;
