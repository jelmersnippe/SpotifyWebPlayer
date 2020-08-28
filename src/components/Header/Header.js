import React from "react";
import "./Header.scss";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { useDataLayerValue } from "../../DataLayer";

function Header() {
  const [{ user }] = useDataLayerValue();

  return (
    <div className="header">
      <div className="searchbar">
        {/* Add search functionality with a dropdown, and a SearchView page for extensive searching */}
        <SearchIcon className="icon search" />
        <input
          className="input"
          type="text"
          placeholder="Search for songs, albums or podcasts"
        />
      </div>
      {user && (
        <div className="user">
          <Avatar className="avatar" />
          <span className="name">{user.display_name}</span>
        </div>
      )}
    </div>
  );
}

export default Header;
