import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import "./SearchView.scss";
import { SearchItem } from "./SearchItem";
import { useDataLayerValue } from "../../../DataLayer";
import SpotifyWebApi from "spotify-web-api-js";

function SearchView({ type }) {
  const [{ searchResults, searchTerm }, dispatch] = useDataLayerValue();
  const [typeResults, setTypeResults] = useState([]);
  const spotify = new SpotifyWebApi();
  const history = useHistory();
  const location = useLocation();

  /* 
  Same functionality as the search bar in the header
  TODO: Make the searchbar into it's own component OR somehow only have one in the entire app
  */
  function handleSearch(event) {
    if (location.pathname !== "/search") history.push("/search");
    dispatch({
      type: "SET_SEARCH_TERM",
      searchTerm: event.target.value,
    });
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

  // If a type is specified: fetch 50 items of that type for the type-specific view
  useEffect(() => {
    if (type) {
      spotify.search(searchTerm, [type], { limit: 50 }).then((response) => {
        setTypeResults(response);
      });
    }
  }, [type, searchTerm]);

  return (
    <div className="search view">
      <h2 className="title">Search</h2>
      <div className="searchbar">
        <SearchIcon className="icon search" />
        <input
          className="input"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for songs, albums or artists"
        />
      </div>
      <div className="result-grid grid">
        {/* 
        Split the search results into seperate sections 
        based on their key in the results object 
        */}
        {searchResults && !type
          ? // If we have not selected a specific type show the overview
            Object.keys(searchResults).map((key) => (
              <div className={`result-block ${key}`} key={key}>
                <div className={`result-header ${key}`}>
                  <div className="result-type">{key}</div>
                  <Link
                    to={`/search/${key.substring(0, key.length - 1)}`}
                    className="see-all"
                  >
                    See all
                  </Link>
                </div>
                <div className={`result-items ${key}`}>
                  {searchResults[key].items.map((item) => {
                    return <SearchItem item={item} key={item.id} />;
                  })}
                </div>
              </div>
            ))
          : // If a specific type is selected we show the list view of the single type. Ex: Only albums
            Object.keys(typeResults).map((key) => (
              <div className={`result-block ${key} specific`} key={key}>
                <div className={`result-header ${key}`}>
                  <div className="result-type">{key}</div>
                </div>
                {typeResults[key].items.map((item) => {
                  return <SearchItem item={item} key={item.id} />;
                })}
              </div>
            ))}
      </div>
    </div>
  );
}

export default SearchView;
