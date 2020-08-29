import React from "react";
import "./LibraryView.scss";
import {
  NavItem,
  PlaylistItem,
  ArtistItem,
  AlbumItem,
} from "../../../components";
import { useDataLayerValue } from "../../../DataLayer";

function LibraryView({ type }) {
  const [{ playlists, artists, albums }] = useDataLayerValue();

  return (
    <div className="library view">
      <h2 className="title">Library</h2>
      <div className="nav">
        <NavItem text="Playlists" path="/library/playlists" key="playlists" />
        <NavItem text="Artists" path="/library/artists" key="artists" />
        <NavItem text="Albums" path="/library/albums" key="albums" />
      </div>
      <div className={`content ${type}`}>
        {type === "playlists" &&
          playlists?.items?.map((playlist) => (
            <PlaylistItem playlist={playlist} key={playlist.id} />
          ))}
        {type === "artists" &&
          artists.map((artist) => (
            <ArtistItem artist={artist} key={artist.id} />
          ))}
        {type === "albums" &&
          albums.map((album) => <AlbumItem album={album} key={album.id} />)}
      </div>
    </div>
  );
}

export default LibraryView;
