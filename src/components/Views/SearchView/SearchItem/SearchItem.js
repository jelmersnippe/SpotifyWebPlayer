import React from "react";
import { Link } from "react-router-dom";
import "./SearchItem.scss";

function SearchItem({ item }) {
  return (
    <Link
      to={`/${item.type !== "track" ? item.type : "album"}/${
        item.type !== "track" ? item.id : item.album.id
      }`}
      className={`search-item ${item.type}`}
    >
      <img
        className="art"
        src={
          item.type === "track"
            ? item?.album?.images?.reduce((initial, image) => {
                if (!initial.url || image.height < initial.height) {
                  initial = image;
                }
                return initial;
              }, {}).url
            : item?.images?.reduce((initial, image) => {
                if (!initial.url || image.height < initial.height) {
                  initial = image;
                }
                return initial;
              }, {}).url
        }
        alt=""
      />
      <div className="info">
        <div className="name">{item.name}</div>
        {item.artists && (
          <div className="artist">
            {item?.artists
              .map((artist) => artist.name)
              .reduce((initial, artist) => {
                if (initial !== "") {
                  initial += ", ";
                }
                initial += artist;
                return initial;
              }, "")}
          </div>
        )}
      </div>
    </Link>
  );
}

export default SearchItem;
