import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import "./Player.scss";
import {
  Sidebar,
  PlaylistView,
  HomeView,
  Footer,
  QueueView,
  Header,
  MobileNav,
  LibraryView,
  SearchView,
  CurrentlyPlayingView,
} from "../../components";
import { Route, Switch } from "react-router-dom";
import { useDataLayerValue } from "../../DataLayer";
import SpotifyWebApi from "spotify-web-api-js";
import SpotifyWebPlayer from "./SpotifyWebPlayer";

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
      <SpotifyWebPlayer access_token={spotify.getAccessToken()} />
      <div className="main-content">
        <Sidebar />
        <div className="body">
          <Header />
          <Switch>
            {/* 
            Add functionality for these routes 
            So basically add a SearchView, HomeView and LibraryView
            */}
            <Route exact path="/">
              <HomeView />
            </Route>
            <Route path="/search">
              <SearchView />
            </Route>
            <Route path="/library">
              <LibraryView />
            </Route>
            <Route path="/queue">
              <QueueView />
            </Route>
            <Route path="/currently-playing">
              <CurrentlyPlayingView />
            </Route>
            <Route path="/logout">
              {() => {
                cookies.remove("session_token");
              }}
            </Route>
            <Route
              path="/playlist/:playlistId"
              render={(routerProps) => {
                return (
                  <PlaylistView id={routerProps.match.params.playlistId} />
                );
              }}
            />
          </Switch>

          <MobileNav />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Player;
