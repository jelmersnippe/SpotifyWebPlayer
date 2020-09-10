import React, { useEffect } from "react";
import "./AlbumOverview.scss";
import { useDataLayerValue } from "../../../../DataLayer";
import SpotifyWebApi from "spotify-web-api-js";
import { AlbumItem } from "./AlbumItem";

function AlbumOverview() {
  const [{ albums }, dispatch] = useDataLayerValue();
  const spotify = new SpotifyWebApi();

  // Get the suers saved albums and set it in the global state
  async function getAlbums(offset) {
    spotify
      .getMySavedAlbums({ limit: 50, offset: offset })
      .then((response) => {
        dispatch({
          type: "SET_ALBUMS",
          albums: response.items,
        });
        /* 
        Spotify only allows fetching 50 items at once
        so we have to fetch again with an offset if we find 50 items returned

        TODO: this should probably be lazy loaded
        */
        if (response.items.length >= 50) {
          getAlbums(offset + 50);
        }
      })
      .catch((error) => console.log(error));
  }

  // Only fetch albums if we have not done it before
  useEffect(() => {
    if (albums.length === 0) {
      getAlbums(0);
    }
  }, [albums]);

  return (
    <div className="content artists">
      {albums.map((album) => (
        <AlbumItem album={album.album} key={album.album.id} />
      ))}
    </div>
  );
}

export default AlbumOverview;
