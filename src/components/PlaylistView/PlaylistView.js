import React from "react";
import "./PlaylistView.scss";
import { Banner, SongList } from "..";
import { useDataLayerValue } from "../../DataLayer";

function PlaylistView({ id }) {
  const [{ playlists }] = useDataLayerValue();

  return (
    <>
      {playlists?.items?.map(
        (playlist) =>
          playlist.id === id && (
            <div key={id}>
              <Banner playlist={playlist} />
              <SongList playlist={playlist} />
            </div>
          )
      )}
    </>
  );
}

export default PlaylistView;
