import React from "react";
import "./AlbumList.scss";
import { AlbumItem } from "./AlbumItem";

function AlbumList({ albums }) {
  return (
    <ul className="albumlist">
      {albums?.map((album) => (
        <AlbumItem album={album} key={album.id} />
      ))}
    </ul>
  );
}

export default AlbumList;
