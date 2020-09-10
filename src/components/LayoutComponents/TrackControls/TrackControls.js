import React, { useEffect, useState } from "react";
import "./TrackControls.scss";

import ShuffleIcon from "@material-ui/icons/Shuffle";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import RepeatIcon from "@material-ui/icons/Repeat";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";
import Slider from "@material-ui/core/Slider";

import { useDataLayerValue } from "../../../DataLayer";
import SpotifyWebApi from "spotify-web-api-js";

function TrackControls({ location }) {
  const [{ playbackState }] = useDataLayerValue();
  const spotify = new SpotifyWebApi();

  // Track progress in the datalayer
  // The footer and currently playing trackcontrols arent synced
  // because they pull from the playbackState when first loading
  // This means that the currently playing window is not up to date
  const [progress, setProgress] = useState(0);
  const [interactingWithProgress, setInteractingWithProgress] = useState(false);

  // Update the track bar every 1 second
  useEffect(() => {
    if (playbackState && !interactingWithProgress) {
      setProgress(playbackState.progress_ms);
      if (playbackState.is_playing) {
        const timer = setInterval(() => {
          setProgress((oldProgress) => (oldProgress += 1000));
        }, 1000);

        return () => {
          clearInterval(timer);
        };
      }
    }
  }, [playbackState, interactingWithProgress]);

  // When the playbackState changes, update the trackbar
  useEffect(() => {
    if (playbackState) {
      setProgress(playbackState.progress_ms);
      setInteractingWithProgress(false);

      if (playbackState.progress_ms === 0) {
        setTimeout(() => {
          setProgress((progress) => (progress += 1));
        }, 1);
      }
    }
  }, [playbackState]);

  const handleProgressChange = (event, newValue) => {
    setInteractingWithProgress(true);
    setProgress(newValue);
  };

  const handleProgressCommit = (event, newValue) => {
    setProgress(newValue);
    spotify.seek(newValue).catch((error) => {
      console.log(error);
      setInteractingWithProgress(false);
    });
  };

  // Make a seperate component for track control
  // And preferably put the functionality in a seperate js file
  // Make the 'setPlaybackState' an async function that can be called anywhere since it's used alot
  function switchPlayState() {
    if (!playbackState) {
      alert("No playback found!");
      return;
    }
    if (playbackState.is_playing) {
      spotify.pause().catch((error) => {
        console.log(error);
      });
    } else {
      spotify.play().catch((error) => {
        console.log(error);
      });
    }
  }

  function skipToNext() {
    if (!playbackState) {
      alert("No playback found!");
      return;
    }
    spotify.skipToNext().catch((error) => {
      console.log(error);
    });
  }

  function skipToPrevious() {
    if (!playbackState) {
      alert("No playback found!");
      return;
    }
    if (playbackState?.actions?.disallows?.skipping_prev) {
      spotify.seek(0).catch((error) => console.log(error));
    } else {
      spotify.skipToPrevious().catch((error) => {
        console.log(error);
      });
    }
  }

  function setShuffle() {
    if (!playbackState) {
      alert("No playback found!");
      return;
    }
    spotify
      .setShuffle(!playbackState.shuffle_state)
      .catch((error) => console.log(error));
  }

  function setRepeat() {
    switch (playbackState.repeat_state) {
      case "off":
        spotify.setRepeat("context");
        break;
      case "context":
        spotify.setRepeat("track");
        break;
      case "track":
        spotify.setRepeat("off");
        break;
      default:
        spotify.setRepeat("off");
        break;
    }
  }

  return (
    <div className={`track-controls ${location && location + "-controls"}`}>
      <div className="actions">
        <button onClick={() => setShuffle()}>
          <ShuffleIcon
            className={`icon shuffle ${
              playbackState?.shuffle_state && "active"
            }`}
          />
        </button>
        <button
          onClick={() => {
            skipToPrevious();
          }}
        >
          <SkipPreviousIcon className="icon prev" />
        </button>

        {playbackState?.is_playing ? (
          <button
            onClick={() => {
              switchPlayState();
            }}
          >
            <PauseIcon className="icon play" />
          </button>
        ) : (
          <button
            onClick={() => {
              switchPlayState();
            }}
          >
            <PlayArrowIcon className="icon play" />
          </button>
        )}
        <button
          onClick={() => {
            skipToNext();
          }}
        >
          <SkipNextIcon className="icon next" />
        </button>
        {playbackState?.repeat_state === "track" ? (
          <button
            onClick={() => {
              setRepeat();
            }}
          >
            <RepeatOneIcon className="icon repeat active" />
          </button>
        ) : (
          <button
            onClick={() => {
              setRepeat();
            }}
          >
            <RepeatIcon
              className={`icon repeat ${
                playbackState?.repeat_mode === "context" && "active"
              }`}
            />
          </button>
        )}
      </div>

      {playbackState?.item && (
        <div className="bar">
          <span className="progress">
            {progress > 0 &&
              `${Math.floor(((progress / 1000) % 3600) / 60)}:${
                (Math.floor(progress / 1000) % 3600) % 60
              }`}
          </span>
          <Slider
            className="slider"
            value={progress ? progress : 0}
            max={
              playbackState?.item?.duration_ms
                ? playbackState?.item?.duration_ms
                : 100
            }
            onChange={handleProgressChange}
            onChangeCommitted={handleProgressCommit}
          />
          <span className="duration">
            {playbackState?.item?.duration_ms &&
              `${Math.floor(
                ((playbackState?.item?.duration_ms / 1000) % 3600) / 60
              )}:${
                (Math.floor(playbackState?.item?.duration_ms / 1000) % 3600) %
                60
              }`}
          </span>
        </div>
      )}
    </div>
  );
}

export default TrackControls;
