import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import Slider from "@material-ui/core/Slider";
import { TrackControls } from "../../components";
import { useDataLayerValue } from "../../DataLayer";
import SpotifyWebApi from "spotify-web-api-js";

function Footer() {
  const [{ playbackState }, dispatch] = useDataLayerValue();
  const [volume, setVolume] = useState(100);
  const spotify = new SpotifyWebApi();

  function handleVolumeCommit(event, newValue) {
    if (!playbackState) {
      alert("No playback found!");
      return;
    }
    spotify.setVolume(newValue).catch((error) => console.log(error));
  }

  function handleVolumeChange(event, newValue) {
    if (!playbackState) {
      alert("No playback found!");
      return;
    }
    setVolume(newValue);
  }

  useEffect(() => {
    if (playbackState) {
      setVolume(playbackState?.device?.volume_percent);
    }
  }, [playbackState]);

  return (
    <div className="footer">
      <div className="currently-playing">
        {playbackState && (
          <>
            <Link to="/currently-playing">
              <img
                className="album-cover"
                src={
                  playbackState?.item?.album?.images?.reduce(
                    (initial, image) => {
                      if (!initial.url || image.height < initial.height) {
                        initial = image;
                      }
                      return initial;
                    },
                    {}
                  ).url
                }
                alt=""
              />
            </Link>
            <div className="track-info">
              <h4 className="name">{playbackState?.item?.name}</h4>
              <span className="artist">
                {playbackState?.item?.artists
                  .map((artist) => artist.name)
                  .reduce((initial, artist) => {
                    if (initial !== "") {
                      initial += ", ";
                    }
                    initial += artist;
                    return initial;
                  }, "")}
              </span>
            </div>
          </>
        )}
        <Link className="mobile-overlay" to="/currently-playing"></Link>
      </div>

      <TrackControls location="footer" />

      <div className="right-section">
        <Link to="/queue" className="icon queue">
          <PlaylistPlayIcon />
        </Link>

        <div className="volume-control">
          <VolumeDownIcon className="icon volume" />
          <Slider
            className="slider volume"
            value={volume}
            onChange={handleVolumeChange}
            onChangeCommitted={handleVolumeCommit}
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
