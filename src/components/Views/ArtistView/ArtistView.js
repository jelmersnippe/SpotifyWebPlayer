import React, { useEffect, useState } from "react";
import "./ArtistView.scss";
import { Banner } from "./Banner";
import { AlbumList } from "./AlbumList";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "../../../DataLayer";

function ArtistView({ id }) {
  const [{ user }] = useDataLayerValue();
  const [artist, setArtist] = useState(null);
  const [artistAlbums, setArtistAlbums] = useState(null);
  const spotify = new SpotifyWebApi();

  useEffect(() => {
    spotify
      .getArtist(id)
      .then((response) => {
        console.log(response);
        setArtist(response);
      })
      .catch((error) => console.log(error));

    let options = {
      include_groups: "album",
      country: user ? user.country : "",
    };
    spotify
      .getArtistAlbums(id, options)
      .then((response) => {
        console.log(response);
        setArtistAlbums(response);
      })
      .catch((error) => console.log(error));
  }, [id, user]);

  return (
    <div className="artist view">
      {artist && <Banner artist={artist} />}
      {artistAlbums && <AlbumList albums={artistAlbums.items} />}
    </div>
  );
}

export default ArtistView;
