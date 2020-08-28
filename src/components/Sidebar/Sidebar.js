import React from "react";
import "./Sidebar.scss";
import { SidebarItem } from "../../components";
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
      >
        <img
          className="logo"
          src={process.env.PUBLIC_URL + "/spotify_logo_large_white.png"}
          alt="Spotify logo"
        />
      </a>

      {/* 
      Add functionality for these buttons 
      So basically add a SearchView, HomeView and LibraryView
      */}
      <ul className="section menu-items">
        <SidebarItem text="Home" Icon={HomeIcon} path="/" key="home" />
        <SidebarItem
          text="Search"
          Icon={SearchIcon}
          path="/search"
          key="search"
        />
        <SidebarItem
          text="Your Library"
          Icon={LibraryMusicIcon}
          path="/library"
          key="library"
        />
      </ul>

      <ul className="section playlists">
        <h3 className="section-title">Playlists</h3>
        {playlists?.items?.map((playlist) => (
          <SidebarItem
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
