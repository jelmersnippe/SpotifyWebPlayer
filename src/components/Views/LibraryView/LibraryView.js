import React from "react";
import "./LibraryView.scss";
import { NavItem } from "../../../components";

import { ArtistOverview } from "./ArtistOverview";
import { AlbumOverview } from "./AlbumOverview";
import { PlaylistOverview } from "./PlaylistOverview";

function LibraryView({ type }) {
  return (
    <div className="library view">
      <h2 className="title">Library</h2>
      <div className="nav">
        <NavItem text="Playlists" path="/library/playlists" key="playlists" />
        <NavItem text="Artists" path="/library/artists" key="artists" />
        <NavItem text="Albums" path="/library/albums" key="albums" />
      </div>
      {type === "playlists" && <PlaylistOverview />}
      {type === "artists" && <ArtistOverview />}
      {type === "albums" && <AlbumOverview />}
    </div>
  );
}

export default LibraryView;
