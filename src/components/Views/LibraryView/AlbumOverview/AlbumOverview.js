import React, { useEffect } from "react";
import "./AlbumOverview.scss";
import { useDataLayerValue } from "../../../../DataLayer";
import SpotifyWebApi from "spotify-web-api-js";
import { AlbumItem } from "./AlbumItem";

function AlbumOverview() {
  const [{ albums }, dispatch] = useDataLayerValue();
  const spotify = new SpotifyWebApi();

  async function getAlbums(offset) {
    spotify
      .getMySavedAlbums({ limit: 50, offset: offset })
      .then((response) => {
        dispatch({
          type: "SET_ALBUMS",
          albums: response.items,
        });
        if (response.items.length >= 50) {
          getAlbums(offset + 50);
        }
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getAlbums(0);
  }, []);
  return albums.map((album) => (
    <AlbumItem album={album} key={album.album.id} />
  ));
}

export default AlbumOverview;
