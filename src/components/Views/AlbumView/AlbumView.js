import React, { useEffect, useState } from "react";
import "./AlbumView.scss";
import { AlbumItem } from "../ArtistView/AlbumList/AlbumItem";
import SpotifyWebApi from "spotify-web-api-js";

function AlbumView({ id }) {
  const [album, setAlbum] = useState(null);
  const spotify = new SpotifyWebApi();

  useEffect(() => {
    spotify
      .getAlbum(id)
      .then((response) => {
        setAlbum(response);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return album && <AlbumItem album={album} />;
}

export default AlbumView;
