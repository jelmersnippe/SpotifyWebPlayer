import React, { useEffect, useState } from "react";
import "./PlaylistView.scss";
import { Banner } from "./Banner";
import { SongList } from "../../../components";
import SpotifyWebApi from "spotify-web-api-js";

function PlaylistView({ id }) {
  const [playlist, setPlaylist] = useState(null);
  const spotify = new SpotifyWebApi();

  /*
   Get a playlist by id with the market as a parameter
   This prevents fetching tracks that arent's available to the user
   */
  useEffect(() => {
    spotify
      .getPlaylist(id, { market: "from_token" })
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
          <SongList
            tracks={playlist.tracks.items.map((track) => track.track)}
            context={playlist.uri}
          />
        </>
      )}
    </div>
  );
}

export default PlaylistView;
