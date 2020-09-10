import React from "react";
import { Link } from "react-router-dom";
import "./ArtistItem.scss";

function ArtistItem({ artist }) {
  return (
    <Link to={`/artist/${artist.id}`} className="artist-item library-item">
      <img
        className="art"
        src={
          // Get the smallest image available
          artist?.images?.reduce((initial, image) => {
            if (!initial.url || image.height < initial.height) {
              initial = image;
            }
            return initial;
          }, {}).url
        }
        alt=""
      />
      <div className="info">
        <div className="name">{artist.name}</div>
      </div>
    </Link>
  );
}

export default ArtistItem;
