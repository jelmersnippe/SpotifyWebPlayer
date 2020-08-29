import React from "react";
import "./SongItem.scss";
import SpotifyWebApi from "spotify-web-api-js";

function SongItem({ track, context_uri }) {
  const spotify = new SpotifyWebApi();

  function playTrack() {
    // Right now the song just gets played
    // It should automatically queue the rest of the album/artist/playlist

    // "NOW PLAYING" Basically spotify hold your current playing song
    // "YOUR QUEUE" After that there is your personal queue -> this does not get overwritten
    //    This is a seperate object that can be tracked through the API
    // "UP NEXT" After that there is the rest of the album/playlist/arist you played -> this gets overwritten
    //    This is tracked in the playbackState's context -> it contains a reference to the playlist/artist/album that is being played.
    //    This reference can be used to pull the other tracks in the container and add them to the "UP NEXT" list
    spotify
      .play({
        context_uri: context_uri,
        offset: {
          uri: track.track.uri,
        },
        position_ms: 0,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="song-item" onDoubleClick={() => playTrack()}>
      <img
        className="track-art"
        src={track.track.album.images[2].url}
        alt={track.track.name}
      />
      <div className="track-info">
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
  );
}

export default SongItem;
