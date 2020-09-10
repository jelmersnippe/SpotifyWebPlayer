import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import "./Player.scss";
import {
  Sidebar,
  PlaylistView,
  ArtistView,
  AlbumView,
  HomeView,
  Footer,
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
  const [{ user }, dispatch] = useDataLayerValue();
  const spotify = new SpotifyWebApi();
  const cookies = new Cookies();

  /* 
    Whenever the user changes we update the Playlists 
    and PlaybackState in the global state, so the components
    update their data
  */
  useEffect(() => {
    if (user) {
      spotify
        .getUserPlaylists(user.id)
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
    }
  }, [user]);

  return (
    <>
      {/* Instantiate the Spotify WebPlayer SDK with the access token given to the API on login */}
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
                {/* Not Yet Implemented */}
                <Route exact path="/">
                  <HomeView />
                </Route>
                <Route exact path="/search">
                  <SearchView />
                </Route>
                <Route
                  path="/search/:searchType"
                  render={(routerProps) => {
                    // Render a SearchView with a type depending on URL parameter
                    return (
                      <SearchView type={routerProps.match.params.searchType} />
                    );
                  }}
                />
                <Route exact path="/library">
                  <SearchView />
                </Route>
                <Route
                  path="/library/:libraryType"
                  render={(routerProps) => {
                    // Render a LibraryView with a type depending on URL parameter
                    return (
                      <LibraryView
                        type={routerProps.match.params.libraryType}
                      />
                    );
                  }}
                />
                {/* 
                  Dirty way to remove expired tokens, a proper token 
                  refresh/logout should be implemented.
                  Currently the user can only know his token expired if they check
                  the console output
                 */}
                <Route path="/logout">
                  {() => {
                    cookies.remove("session_token");
                  }}
                </Route>
                <Route
                  path="/playlist/:playlistId"
                  render={(routerProps) => {
                    // Render a PlaylistView with a playlist id depending on URL parameter
                    return (
                      <PlaylistView id={routerProps.match.params.playlistId} />
                    );
                  }}
                />
                <Route
                  path="/artist/:artistId"
                  render={(routerProps) => {
                    // Render an ArtistView with an artist id depending on URL parameter
                    return (
                      <ArtistView id={routerProps.match.params.artistId} />
                    );
                  }}
                />
                <Route
                  path="/album/:albumId"
                  render={(routerProps) => {
                    // Render an AlbumView with an album id depending on URL parameter
                    return <AlbumView id={routerProps.match.params.albumId} />;
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
