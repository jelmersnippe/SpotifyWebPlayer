import React, { useEffect, useState } from "react";
import "./PlaylistView.scss";
import { Banner } from "./Banner";
import { SongList } from "../../../components";
import SpotifyWebApi from "spotify-web-api-js";

function PlaylistView({ id }) {
  const [playlist, setPlaylist] = useState(null);
  const spotify = new SpotifyWebApi();

  useEffect(() => {
    spotify
      .getPlaylist(id)
      .then((response) => {
        setPlaylist(response);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div className="playlist view">
      {playlist && (
        <>
          <Banner playlist={playlist} />
          <SongList playlist={playlist} />
        </>
      )}
    </div>
  );
}

export default PlaylistView;
