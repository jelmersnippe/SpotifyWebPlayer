import React from "react";
import { Link } from "react-router-dom";
import "./SongItem.scss";
import SpotifyWebApi from "spotify-web-api-js";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { useDataLayerValue } from "../../../DataLayer";

function SongItem({
  track,
  showNumber = false,
  showArt = true,
  showArtistAlbum = true,
  context_uri,
}) {
  const spotify = new SpotifyWebApi();
  const [{ playbackState }] = useDataLayerValue();

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

  function pauseTrack() {
    spotify.pause().catch((error) => console.log(error));
  }

  function resumeTrack() {
    spotify.play().catch((error) => console.log(error));
  }

  function queueTrack() {
    spotify.queue(track.uri).catch((error) => console.log(error));
  }

  return (
    <div
      className={`song-item ${
        playbackState?.item?.id === track.id &&
        playbackState?.context.uri === context_uri
          ? "playing"
          : ""
      }`}
      onDoubleClick={() => playTrack()}
    >
      {playbackState?.item?.id === track.id &&
      playbackState?.context.uri === context_uri ? (
        playbackState.is_playing ? (
          <button onClick={() => pauseTrack()}>
            <PauseIcon className="icon play" />
          </button>
        ) : (
          <button onClick={() => resumeTrack()}>
            <PlayArrowIcon className="icon play" />
          </button>
        )
      ) : (
        <button onClick={() => playTrack()}>
          <PlayArrowIcon className="icon play" />
        </button>
      )}
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
        <button className="enqueue" onClick={() => queueTrack()}>
          <PlaylistPlayIcon className="enqueue-icon" />
        </button>
        <div className="duration">{`${Math.floor(
          ((track.duration_ms / 1000) % 3600) / 60
        )}:${(Math.floor(track.duration_ms / 1000) % 3600) % 60}`}</div>
      </div>
    </div>
  );
}

export default SongItem;
