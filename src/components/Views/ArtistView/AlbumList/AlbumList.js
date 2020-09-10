import React from "react";
import "./AlbumList.scss";
import { AlbumItem } from "./AlbumItem";

function AlbumList({ albums }) {
  const appearsOnAlbums = [];

  return (
    <ul className="albumlist">
      {albums?.map((album) => {
        /* 
        If the album_group is "appears_on" it is not the artists own album
        and we dont want to show the full album
        Otherwise we render an album item
        
        TODO: add an extra view section with these albums
        */
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
