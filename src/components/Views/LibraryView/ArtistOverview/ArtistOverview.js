import React, { useEffect } from "react";
import "./ArtistOverview.scss";

import { ArtistItem } from "./ArtistItem";
import { useDataLayerValue } from "../../../../DataLayer";
import SpotifyWebApi from "spotify-web-api-js";

function ArtistOverview() {
  const [{ artists }, dispatch] = useDataLayerValue();
  const spotify = new SpotifyWebApi();

  useEffect(() => {
    if (artists.length === 0) {
      spotify
        .getFollowedArtists()
        .then((response) => {
          dispatch({
            type: "SET_ARTISTS",
            artists: response.artists.items,
          });
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <div className="content artists">
      {artists.map((artist) => (
        <ArtistItem artist={artist} key={artist.id} />
      ))}
    </div>
  );
}

export default ArtistOverview;
