import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./Header.scss";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { useDataLayerValue } from "../../../DataLayer";
import SpotifyWebApi from "spotify-web-api-js";

function Header() {
  const [{ user }, dispatch] = useDataLayerValue();
  const spotify = new SpotifyWebApi();
  const history = useHistory();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(event) {
    if (location.pathname !== "/search") history.push("/search");
    setSearchTerm(event.target.value);
    spotify
      .search(event.target.value, ["album", "artist", "track", "playlist"], {
        limit: 4,
      })
      .then((response) => {
        dispatch({
          type: "SET_SEARCH_RESULTS",
          searchResults: response,
        });
      })
      .catch((error) => console.log(error));
  }

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
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for songs, albums or artists"
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
