import React from "react";
import "./ArtistView.scss";
import { Banner } from "./Banner";
import { SongList } from "../..";

function ArtistView({ id }) {
  return (
    <div className="artist view">
      {/* {playlists?.items?.map(
        (playlist) =>
          playlist.id === id && (
            <div key={id}>
              <Banner playlist={playlist} />
              <SongList playlist={playlist} />
            </div>
          )
      )} */}
      Artist View
    </div>
  );
}

export default ArtistView;
