import React from "react";
import { NavItem } from "../../../components";
import "./MobileNav.scss";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

function MobileNav() {
  return (
    <div className="mobile-nav">
      <NavItem Icon={HomeIcon} path="/" key="home" />
      <NavItem Icon={SearchIcon} path="/search" key="search" />
      {/* The library button should also be active inside other library types */}
      <NavItem
        Icon={LibraryMusicIcon}
        path="/library/playlists"
        key="library"
      />
    </div>
  );
}

export default MobileNav;
