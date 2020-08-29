import React from "react";
import Cookies from "universal-cookie";
import "./App.scss";
import { Login, Player } from "./components";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";

function App() {
  const spotify = new SpotifyWebApi();
  const cookies = new Cookies();
  let sessionToken = null;
  if (cookies.get("session_token")) {
    sessionToken = cookies.get("session_token");
    spotify.setAccessToken(sessionToken);
  }

  const urlToken = getTokenFromUrl();
  window.location.hash = "";

  if (urlToken.access_token) {
    cookies.set("session_token", urlToken.access_token, { path: "/" });
    spotify.setAccessToken(urlToken.access_token);
  }

  return (
    <div className="app">
      {urlToken.access_token || sessionToken ? <Player /> : <Login />}
    </div>
  );
}

export default App;
