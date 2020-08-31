import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AlbumItem.scss";
import { SongList } from "../../../../../components";
import SpotifyWebApi from "spotify-web-api-js";

function AlbumItem({ album, isLink = true }) {
  const [albumTracks, setAlbumTracks] = useState(null);
  const spotify = new SpotifyWebApi();

  useEffect(() => {
    spotify
      .getAlbumTracks(album.id, { limit: 50 })
      .then((response) => {
        setAlbumTracks(response.items);
      })
      .catch((error) => console.log(error));
  }, [album]);

  return (
    // When this album is clicked to go to the album view
    // We already have all the album information.
    // This means we have to find a way to pass those props through the Link
    // so they can be used inside the AlbumView component and we dont have to do an unneeded API call
    <div className="album-item">
      <Link className="album-header" to={`/album/${album.id}`}>
        <img
          className="art"
          src={
            album?.images?.reduce((initial, image) => {
              if (!initial.url || image.height > initial.height) {
                initial = image;
              }
              return initial;
            }, {}).url
          }
          alt=""
        />
        <div className="album-info">
          <h4 className="year">
            {new Date(Date.parse(album.release_date)).getFullYear()}
          </h4>
          <h2 className="name">{album.name}</h2>
        </div>
      </Link>
      <SongList
        tracks={albumTracks}
        context={album.uri}
        showNumber={true}
        showArt={false}
        showArtistAlbum={false}
      />
    </div>
  );
}

export default AlbumItem;
