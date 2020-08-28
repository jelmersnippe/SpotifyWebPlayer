import React, { useState, useEffect } from "react";
import "./SongList.scss";
import SpotifyWebApi from "spotify-web-api-js";
import { SongItem } from "../../components";

function SongList({ playlist }) {
  const spotify = new SpotifyWebApi();
  const [playlistTracks, setPlaylistTracks] = useState({});

  useEffect(() => {
    async function getPlaylistTracks() {
      spotify
        .getPlaylistTracks(playlist.id)
        .then((response) => {
          setPlaylistTracks(response);
        })
        .catch((error) => console.log(error));
    }
    getPlaylistTracks();
  }, []);

  return (
    <ul className="songlist">
      {/* Spotify has some sort of filtering with tracks you cant play, should implement this because now there are unplayable tracks */}
      {playlistTracks?.items?.map((track) => (
        <SongItem track={track} key={track.track.id} />
      ))}
    </ul>
  );
}

export default SongList;
