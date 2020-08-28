import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import "./Player.scss";
import { Sidebar, PlaylistView, HomeView, Footer } from "../../components";
import { Route, Switch } from "react-router-dom";
import { useDataLayerValue } from "../../DataLayer";
import SpotifyWebApi from "spotify-web-api-js";

function Player() {
  const [{}, dispatch] = useDataLayerValue();
  const spotify = new SpotifyWebApi();
  const cookies = new Cookies();

  useEffect(() => {
    spotify
      .getMe()
      .then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    spotify
      .getUserPlaylists()
      .then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    spotify
      .getMyCurrentPlaybackState()
      .then((playbackState) => {
        dispatch({
          type: "SET_PLAYBACK_STATE",
          playbackState,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="main-content">
        <Sidebar />
        <div className="body">
          <Switch>
            <Route exact path="/">
              <HomeView />
            </Route>
            <Route path="/search">
              <h2>Search</h2>
            </Route>
            <Route path="/library">
              <h2>Library</h2>
            </Route>
            <Route path="/logout">{cookies.remove("session_token")}</Route>
            <Route
              path="/playlist/:playlistId"
              render={(routerProps) => {
                return (
                  <PlaylistView id={routerProps.match.params.playlistId} />
                );
              }}
            />
          </Switch>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Player;
