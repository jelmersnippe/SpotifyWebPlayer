import React from "react";
import "./PlaylistView.scss";
import { Banner } from "./Banner";
import { SongList } from "../../../components";
import { useDataLayerValue } from "../../../DataLayer";

function PlaylistView({ id }) {
  const [{ playlists }] = useDataLayerValue();

  return (
    <div className="playlist view">
      {playlists?.items?.map(
        (playlist) =>
          playlist.id === id && (
            <div key={id}>
              <Banner playlist={playlist} />
              <SongList playlist={playlist} />
            </div>
          )
      )}
    </div>
  );
}

export default PlaylistView;
