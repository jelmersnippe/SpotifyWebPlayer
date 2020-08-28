import React, { useEffect } from "react";
import "./Player.scss";
import { Sidebar, PlaylistView, HomeView, Footer } from "../../components";
import { Route, Switch } from "react-router-dom";
import { useDataLayerValue } from "../../DataLayer";
import SpotifyWebApi from "spotify-web-api-js";

function Player() {
  const [{}, dispatch] = useDataLayerValue();
  const spotify = new SpotifyWebApi();

  useEffect(() => {
    spotify.getMe().then((user) => {
      dispatch({
        type: "SET_USER",
        user,
      });
    });

    spotify.getUserPlaylists().then((playlists) => {
      dispatch({
        type: "SET_PLAYLISTS",
        playlists,
      });
    });

    spotify.getMyCurrentPlaybackState().then((playbackState) => {
      dispatch({
        type: "SET_PLAYBACK_STATE",
        playbackState,
      });
    });
  }, []);

  // Right now the ENTIRE page reloads when the route changes
  // Rework this so the url changes,
  // but only the body content gets updated
  // The active sidebar item should just be tracked by the sidebar itself
  // so it updates when the state changes
  return (
    <div className="player">
      <div className="main-content">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <HomeView />
          </Route>
          <Route
            path="/playlist/:playlistId"
            render={(routerProps) => {
              return <PlaylistView id={routerProps.match.params.playlistId} />;
            }}
          />
        </Switch>
      </div>

      <Footer />
    </div>
  );
}

export default Player;
