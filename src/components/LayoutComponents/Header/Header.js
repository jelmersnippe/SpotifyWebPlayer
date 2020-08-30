import React, { useEffect } from "react";
import "./Header.scss";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { useDataLayerValue } from "../../../DataLayer";
import SpotifyWebApi from "spotify-web-api-js";

function Header() {
  const [{ user }, dispatch] = useDataLayerValue();
  const spotify = new SpotifyWebApi();

  useEffect(() => {
    spotify
      .getMe()
      .then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="header">
      <div className="searchbar">
        {/* Add search functionality with a dropdown, and a SearchView page for extensive searching */}
        <SearchIcon className="icon search" />
        <input
          className="input"
          type="text"
          placeholder="<Not functional> Search for songs, albums or podcasts"
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
