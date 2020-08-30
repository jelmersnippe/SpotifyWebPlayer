import React from "react";
import "./AlbumView.scss";
import { Banner } from "./Banner";
import { SongList } from "../..";

function AlbumView({ id }) {
  return (
    <div className="album view">
      {/* {playlists?.items?.map(
        (playlist) =>
          playlist.id === id && (
            <div key={id}>
              <Banner playlist={playlist} />
              <SongList playlist={playlist} />
            </div>
          )
      )} */}
      Album View
    </div>
  );
}

export default AlbumView;
