import React from "react";
import { Link } from "react-router-dom";
import "./AlbumItem.scss";

function AlbumItem({ album }) {
  return (
    <Link to={`/album/${album.id}`} className="album-item library-item">
      <img
        className="art"
        src={
          // Get the smallest image available
          album?.images?.reduce((initial, image) => {
            if (!initial.url || image.height < initial.height) {
              initial = image;
            }
            return initial;
          }, {}).url
        }
        alt=""
      />
      <div className="info">
        <div className="name">{album.name}</div>
        <div className="creator">
          {/* If we have multiple artists we concatenate it to a single string */}
          {album?.artists
            .map((artist) => artist.name)
            .reduce((initial, artist) => {
              if (initial !== "") {
                initial += ", ";
              }
              initial += artist;
              return initial;
            }, "")}
        </div>
      </div>
    </Link>
  );
}

export default AlbumItem;
