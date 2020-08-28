import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import "./Footer.scss";

import ShuffleIcon from "@material-ui/icons/Shuffle";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import RepeatIcon from "@material-ui/icons/Repeat";

import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import Slider from "@material-ui/core/Slider";

import LinearProgress from "@material-ui/core/LinearProgress";

import { useDataLayerValue, DataLayerContext } from "../../DataLayer";
import SpotifyWebApi from "spotify-web-api-js";
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 4,
    width: 100 + "%",
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

function Footer() {
  const [{ playbackState }, dispatch] = useDataLayerValue();
  const spotify = new SpotifyWebApi();
  const [progress, setProgress] = useState(0);

  // Update the track bar every 1 second
  useEffect(() => {
    if (playbackState) {
      setProgress(playbackState.position);
      if (!playbackState.paused) {
        const timer = setInterval(() => {
          setProgress((oldProgress) => (oldProgress += 1000));
        }, 1000);

        return () => {
          clearInterval(timer);
        };
      }
    }
  }, [playbackState]);

  // When the playbackState changes, update the trackbar
  useEffect(() => {
    if (playbackState) {
      setProgress(playbackState.position);
    }
  }, [playbackState]);

  // Make a seperate component for track control
  // And preferably put the functionality in a seperate js file
  // Make the 'setPlaybackState' an async function that can be called anywhere since it's used alot
  function switchPlayState() {
    if (!playbackState) {
      alert("No playback found!");
      return;
    }
    if (playbackState.paused) {
      spotify.play().then((response) => {
        console.log(response);
      });
    } else {
      spotify.pause().then((response) => {
        console.log(response);
      });
    }
  }

  function skipToNext() {
    if (!playbackState) {
      alert("No playback found!");
      return;
    }
    spotify
      .skipToNext()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function skipToPrevious() {
    if (!playbackState) {
      alert("No playback found!");
      return;
    }
    spotify
      .skipToPrevious()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        spotify.seek(0).then(() => {
          setTimeout(() => {
            spotify.getMyCurrentPlaybackState().then((response) => {
              dispatch({
                type: "SET_PLAYBACK_STATE",
                playbackState: response,
              });
            });
          }, 300);
        });
      });
  }

  function setShuffle() {
    if (!playbackState) {
      alert("No playback found!");
      return;
    }
    spotify
      .setShuffle(!playbackState.shuffle_state)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  }

  function setVolume(event, newValue) {
    if (!playbackState) {
      alert("No playback found!");
      return;
    }
    spotify
      .setVolume(newValue)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="footer">
      <div className="currently-playing">
        {playbackState && (
          <>
            <img
              className="album-cover"
              src={
                playbackState?.track_window?.current_track?.album?.images?.reduce(
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
            <div className="track-info">
              <h4 className="artist">
                {playbackState?.track_window?.current_track?.artists
                  .map((artist) => artist.name)
                  .reduce((initial, artist) => {
                    if (initial !== "") {
                      initial += ", ";
                    }
                    initial += artist;
                    return initial;
                  }, "")}
              </h4>
              <span className="name">
                {playbackState?.track_window?.current_track?.name}
              </span>
            </div>
          </>
        )}
      </div>
      <div className="track-control">
        <div className="actions">
          <ShuffleIcon
            onClick={() => setShuffle()}
            className={`icon shuffle ${playbackState?.shuffle && "active"}`}
          />
          <SkipPreviousIcon
            onClick={() => {
              skipToPrevious();
            }}
            className="icon prev"
          />

          {playbackState?.paused ? (
            <PlayArrowIcon
              onClick={() => {
                switchPlayState();
              }}
              className="icon play"
            />
          ) : (
            <PauseIcon
              onClick={() => {
                switchPlayState();
              }}
              className="icon play"
            />
          )}
          <SkipNextIcon
            onClick={() => {
              skipToNext();
            }}
            className="icon next"
          />
          <RepeatIcon className="icon repeat" />
        </div>
        {playbackState && (
          <div className="bar">
            <span className="progress">{Math.floor(progress / 1000)}</span>
            <BorderLinearProgress
              variant="determinate"
              value={(progress / playbackState.duration) * 100}
            />
            <span className="duration">
              {Math.floor(playbackState.duration / 1000)}
            </span>
          </div>
        )}
      </div>

      <div className="right-section">
        {/* 
        Add functionality for this queue button
          So basically, add a QueueView
        */}
        <PlaylistPlayIcon className="icon queue" />

        <div className="volume-control">
          <VolumeDownIcon className="icon volume" />
          {playbackState?.device?.volume_percent && (
            <div className="slider volume">
              <Slider
                value={playbackState.device.volume_percent}
                onChange={setVolume}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Footer;
