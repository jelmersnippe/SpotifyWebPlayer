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

  useEffect(() => {
    if (type) {
      spotify.search(searchTerm, [type], { limit: 50 }).then((response) => {
        setTypeResults(response);
      });
    }
  }, [type]);

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
        {searchResults && !type
          ? Object.keys(searchResults).map((key) => (
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
          : Object.keys(typeResults).map((key) => (
              <div className={`result-block ${key}`} key={key}>
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
