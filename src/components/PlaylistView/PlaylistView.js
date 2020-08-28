import React from "react";
import "./PlaylistView.scss";
import { Header, Banner, SongList } from "..";
import { useDataLayerValue } from "../../DataLayer";

function PlaylistView({ id }) {
  const [{ playlists }] = useDataLayerValue();

  return (
    <>
      <Header />
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
