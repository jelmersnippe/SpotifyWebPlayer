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
} from "../..";
import { Route, Switch } from "react-router-dom";
import { useDataLayerValue } from "../../../DataLayer";
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
      .getFollowedArtists()
      .then((response) => {
        dispatch({
          type: "SET_ARTISTS",
          artists: response.artists.items,
        });
      })
      .catch((error) => console.log(error));

    spotify
      .getMySavedAlbums({ limit: 50 })
      .then((response) => {
        dispatch({
          type: "SET_ALBUMS",
          albums: response.items,
        });
      })
      .catch((error) => console.log(error));

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
      <Switch>
        <Route path="/currently-playing">
          <div className="row-container">
            <Sidebar />
            <CurrentlyPlayingView />
            <MobileNav />
          </div>
        </Route>
        <Route>
          <div className="body">
            <Sidebar />
            <div className="main-content">
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
                <Route
                  path="/library/:libraryType"
                  render={(routerProps) => {
                    return (
                      <LibraryView
                        type={routerProps.match.params.libraryType}
                      />
                    );
                  }}
                />
                <Route path="/queue">
                  <QueueView />
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
        </Route>
      </Switch>
    </>
  );
}

export default Player;
