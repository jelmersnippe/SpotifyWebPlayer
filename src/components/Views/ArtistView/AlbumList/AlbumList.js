import React from "react";
import "./AlbumList.scss";
import { AlbumItem } from "./AlbumItem";

function AlbumList({ albums }) {
  const appearsOnAlbums = [];

  return (
    <ul className="albumlist">
      {albums?.map((album) => {
        if (album.album_group === "appears_on") {
          appearsOnAlbums.push(album);
        } else {
          return <AlbumItem album={album} key={album.id} />;
        }
      })}
    </ul>
  );
}

export default AlbumList;
