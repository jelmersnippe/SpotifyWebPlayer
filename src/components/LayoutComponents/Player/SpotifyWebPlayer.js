import React from "react";
import { useDataLayerValue } from "../../../DataLayer";
import SpotifyWebApi from "spotify-web-api-js";

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
const spotifyWebPlayerSDK = injectScript(
  "https://sdk.scdn.co/spotify-player.js"
);

function SpotifyWebPlayer({ access_token }) {
  const [{ playbackState }, dispatch] = useDataLayerValue();
  const spotifyAPI = new SpotifyWebApi();

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
            fetch("https://api.spotify.com/v1/me/player", {
              method: "PUT",
              headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              }),
              body: JSON.stringify({
                device_ids: ["24cba3f0f9714dde242fe9233d4366284439a19b"],
                play: false,
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
