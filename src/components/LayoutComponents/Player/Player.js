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
                <Route
                  path="/artist/:artistId"
                  render={(routerProps) => {
                    return (
                      <ArtistView id={routerProps.match.params.artistId} />
                    );
                  }}
                />
                <Route
                  path="/album/:albumId"
                  render={(routerProps) => {
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
