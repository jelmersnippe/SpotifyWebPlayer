import React from "react";
import "./PlaylistItem.scss";
import { Link } from "react-router-dom";

function PlaylistItem({ playlist }) {
  return (
    <Link
      className="playlist-item library-item"
      to={`/playlist/${playlist.id}`}
    >
      <img
        className="art"
        src={
          // Get the smallest image available
          playlist?.images?.reduce((initial, image) => {
            if (!initial.url || image.height < initial.height) {
              initial = image;
            }
            return initial;
          }, {}).url
        }
        alt=""
      />
      <div className="info">
        <div className="name">{playlist.name}</div>
        <div className="creator">{playlist.owner.display_name}</div>
      </div>
    </Link>
  );
}

export default PlaylistItem;
