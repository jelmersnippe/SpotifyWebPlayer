import React from "react";
import "./Sidebar.scss";
import { NavItem } from "../../components";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { useDataLayerValue } from "../../DataLayer";

// Track the active item in a state
// And add styling for active menu items
function Sidebar() {
  const [{ playlists }] = useDataLayerValue();

  return (
    <div className="sidebar">
      <a
        href="https://open.spotify.com/"
        title="Open Spotify.com in the browser"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="logo"
          src={process.env.PUBLIC_URL + "/spotify_logo_large_white.png"}
          alt="Spotify logo"
        />
      </a>

      <ul className="section menu-items">
        <NavItem text="Home" Icon={HomeIcon} path="/" key="home" />
        <NavItem text="Search" Icon={SearchIcon} path="/search" key="search" />
        <NavItem
          text="Your Library"
          Icon={LibraryMusicIcon}
          path="/library/playlists"
          key="library"
        />
      </ul>

      <ul className="section playlists">
        <h3 className="section-title">Playlists</h3>
        {playlists?.items?.map((playlist) => (
          <NavItem
            type="playlist"
            text={playlist.name}
            path={`/playlist/${playlist.id}`}
            key={playlist.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
