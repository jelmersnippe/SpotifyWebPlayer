import React from "react";
import { Link } from "react-router-dom";
import "./SearchItem.scss";
import SpotifyWebApi from "spotify-web-api-js";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import { useDataLayerValue } from "../../../../DataLayer";

function SearchItem({ item }) {
  const spotify = new SpotifyWebApi();
  const [{ playbackState }] = useDataLayerValue();

  function playItem() {
    let options = {};
    if (item.type === "track") {
      options = { uris: [item.uri] };
    } else {
      options = { context_uri: item.uri };
    }

    spotify.play(options).catch((error) => console.log(error));
  }

  function pauseItem() {
    spotify.pause().catch((error) => console.log(error));
  }

  function resumeItem() {
    spotify.play().catch((error) => console.log(error));
  }

  return (
    <div className={`search-item ${item.type}`}>
      <div className="art-section">
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
          onClick={() => playItem()}
        />
        <div className="icon-wrapper">
          {playbackState?.context?.uri === item?.uri ? (
            playbackState.is_playing ? (
              <PauseIcon
                className="icon play active"
                onClick={() => pauseItem()}
              />
            ) : (
              <PlayArrowIcon
                className="icon play active"
                onClick={() => resumeItem()}
              />
            )
          ) : (
            <PlayArrowIcon className="icon play" onClick={() => playItem()} />
          )}
        </div>
      </div>
      <Link
        to={`/${item.type !== "track" ? item.type : "album"}/${
          item.type !== "track" ? item.id : item.album.id
        }`}
        className="info"
      >
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
      </Link>
    </div>
  );
}

export default SearchItem;
