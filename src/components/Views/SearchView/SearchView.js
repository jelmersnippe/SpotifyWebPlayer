import React, { useState } from "react";
import "./SearchView.scss";
import SpotifyWebApi from "spotify-web-api-js";
import { SearchItem } from "./SearchItem";
import { useDataLayerValue } from "../../../DataLayer";

function SearchView() {
  const [{ searchResults }, dispatch] = useDataLayerValue();
  const spotify = new SpotifyWebApi();
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(event) {
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

  return (
    <div className="search view">
      <h2 className="title">Search</h2>
      {/* <input
        value={searchTerm}
        placeholder="Search for songs, albums or artists"
        onChange={handleSearch}
      /> */}
      <div className="result-grid grid">
        {searchResults &&
          Object.keys(searchResults).map((key) => (
            <div className={`result-block ${key}`} key={key}>
              <div className={`header ${key}`}>
                <div className="type">{key}</div>
                <div className="see-all">See all</div>
              </div>
              <div className={`items ${key}`}>
                {searchResults[key].items.map((item) => {
                  return <SearchItem item={item} key={item.id} />;
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchView;
