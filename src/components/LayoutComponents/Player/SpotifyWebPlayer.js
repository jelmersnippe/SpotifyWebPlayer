import React from "react";
import { useDataLayerValue } from "../../../DataLayer";
import SpotifyWebApi from "spotify-web-api-js";

/*
 Function to inject a script into the document
 because we can't use script tags like in regular HTML
 */
function injectScript(src) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement("script");
    script.src = src;
    script.addEventListener("load", function () {
      resolve();
    });
    script.addEventListener("error", function (e) {
      reject(e);
    });
    document.body.appendChild(script);
  });
}

// Inject the Spotify WebPlayer SDK into the page so we can use playback functionality
const spotifyWebPlayerSDK = injectScript(
  "https://sdk.scdn.co/spotify-player.js"
);

function SpotifyWebPlayer({ access_token }) {
  const [{ playbackState }, dispatch] = useDataLayerValue();
  const spotifyAPI = new SpotifyWebApi();

  // When the SDK is loaded we set a new player and add listeners
  spotifyWebPlayerSDK
    .then(
      () =>
        (window.onSpotifyWebPlaybackSDKReady = () => {
          const token = access_token;
          const player = new window.Spotify.Player({
            name: "Spotify Web Player by Jelmer Snippe",
            getOAuthToken: (cb) => {
              cb(token);
            },
          });

          // Error handling
          player.addListener("initialization_error", ({ message }) => {
            console.error(message);
          });
          player.addListener("authentication_error", ({ message }) => {
            console.error(message);
          });
          player.addListener("account_error", ({ message }) => {
            console.error(message);
          });
          player.addListener("playback_error", ({ message }) => {
            console.error(message);
          });

          // Playback status updates
          player.addListener("player_state_changed", (state) => {
            if (!state || !playbackState) {
              /* 
              If we do not have a playbackState in the global state yet we 
              perform an API call to Spotify to check the current PlaybackState
              */
              spotifyAPI
                .getMyCurrentPlaybackState()
                .then((playbackState) => {
                  dispatch({
                    type: "SET_PLAYBACK_STATE",
                    playbackState,
                  });
                })
                .catch((error) => console.log(error));
            } else {
              /*
                Otherwise we map the received state to the existing state
                We have to perform this complicated state operation because
                the API and SDK have completely different playback state objects
              */
              dispatch({
                type: "SET_PLAYBACK_STATE",
                playbackState: {
                  ...playbackState,
                  context: { ...playbackState.context, uri: state.context.uri },
                  actions: {
                    ...playbackState.actions,
                    disallows: state.disallows,
                  },
                  is_playing: !state.paused,
                  progress_ms: state.position,
                  shuffle_state: state.shuffle,
                  timestamp: state.timestamp,
                  item: {
                    ...state.track_window.current_track,
                    duration_ms: state.duration,
                  },
                },
              });
            }
          });

          // Ready
          player.addListener("ready", ({ device_id }) => {
            console.log("Device ready: ", device_id);
            /*
              Take over the Spotify playback on this player
            */
            fetch("https://api.spotify.com/v1/me/player", {
              method: "PUT",
              headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              }),
              body: JSON.stringify({
                device_ids: [device_id],
                play: true,
              }),
            }).catch((error) => console.log(error));
          });

          // Not Ready
          player.addListener("not_ready", ({ device_id }) => {
            console.log("Device ID has gone offline", device_id);
          });

          // Connect to the player!
          player.connect();
        })
    )
    .catch(() => console.log("error loading script"));

  return <></>;
}

export default SpotifyWebPlayer;
