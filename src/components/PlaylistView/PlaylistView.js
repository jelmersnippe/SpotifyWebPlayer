import React from "react";
import "./PlaylistView.scss";
import { Header, Banner, SongList } from "..";
import { useDataLayerValue } from "../../DataLayer";

function PlaylistView({ id }) {
  const [{ playlists }] = useDataLayerValue();
  console.log(id);
  console.log(playlists);

  return (
    <div className="body">
      <Header />
      {playlists?.items?.map(
        (playlist) =>
          playlist.id == id && (
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
