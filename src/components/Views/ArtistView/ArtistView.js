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

  /* 
  Whenever the id changes we fetch the artist from Spotify and set it in state
  Then we get the artists albums with the current users country code
  We add the country code to prevent the user seeing albums that arent available in his/her country
  */
  useEffect(() => {
    spotify
      .getArtist(id)
      .then((response) => {
        setArtist(response);
      })
      .catch((error) => console.log(error));

    let options = {
      country: user ? user.country : "",
    };
    spotify
      .getArtistAlbums(id, options)
      .then((response) => {
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
