import React from "react";
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

import { useDataLayerValue } from "../../DataLayer";
import SpotifyWebApi from "spotify-web-api-js";

function Footer() {
  const [{ playbackState }, dispatch] = useDataLayerValue();
  const spotify = new SpotifyWebApi();

  // Make a seperate component for track control
  // And preferably put the functionality in a seperate js file
  // Make the 'setPlaybackState' an async function that can be called anywhere since it's used alot
  function switchPlayState() {
    if (playbackState.is_playing) {
      spotify.pause().then(() => {
        dispatch({
          type: "SET_PLAYBACK_STATE",
          playbackState: { ...playbackState, is_playing: false },
        });
      });
    } else {
      spotify.play().then(() => {
        dispatch({
          type: "SET_PLAYBACK_STATE",
          playbackState: { ...playbackState, is_playing: true },
        });
      });
    }
  }

  function skipToNext() {
    spotify
      .skipToNext()
      .then(() => {
        setTimeout(() => {
          spotify.getMyCurrentPlaybackState().then((response) => {
            dispatch({
              type: "SET_PLAYBACK_STATE",
              playbackState: response,
            });
          });
        }, 300);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function skipToPrevious() {
    spotify
      .skipToPrevious()
      .then(() => {
        setTimeout(() => {
          spotify.getMyCurrentPlaybackState().then((response) => {
            dispatch({
              type: "SET_PLAYBACK_STATE",
              playbackState: response,
            });
          });
        }, 300);
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
    spotify
      .setShuffle(!playbackState.shuffle_state)
      .then(() => {
        dispatch({
          type: "SET_PLAYBACK_STATE",
          playbackState: {
            ...playbackState,
            shuffle_state: !playbackState.shuffle_state,
          },
        });
      })
      .catch((error) => console.log(error));
  }

  function setVolume(event, newValue) {
    spotify
      .setVolume(newValue)
      .then(() => {
        dispatch({
          type: "SET_PLAYBACK_STATE",
          playbackState: {
            ...playbackState,
            device: { ...playbackState.device, volume_percent: newValue },
          },
        });
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
              src={playbackState.item.album.images[2].url}
              alt=""
            />
            <div className="track-info">
              <h4 className="artist">
                {playbackState.item.artists
                  .map((artist) => artist.name)
                  .reduce((initial, artist) => {
                    if (initial !== "") {
                      initial += ", ";
                    }
                    initial += artist;
                    return initial;
                  }, "")}
              </h4>
              <span className="name">{playbackState.item.name}</span>
            </div>
          </>
        )}
      </div>
      <div className="track-control">
        <ShuffleIcon
          onClick={() => setShuffle()}
          className={`icon shuffle ${playbackState?.shuffle_state && "active"}`}
        />
        <SkipPreviousIcon
          onClick={() => {
            skipToPrevious();
          }}
          className="icon prev"
        />

        {playbackState?.is_playing ? (
          <PauseIcon
            onClick={() => {
              switchPlayState();
            }}
            className="icon play"
          />
        ) : (
          <PlayArrowIcon
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
      <div className="right-section">
        {/* 
        Add functionality for this queue button
          So basically, add a QueueView
        */}
        <PlaylistPlayIcon className="icon queue" />

        {playbackState && (
          <div className="volume-control">
            <VolumeDownIcon className="icon volume" />
            <div className="slider volume">
              <Slider
                value={playbackState.device.volume_percent}
                onChange={setVolume}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Footer;
