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
    console.log("session token: ", sessionToken);
    spotify.setAccessToken(sessionToken);
  }

  const urlToken = getTokenFromUrl();
  window.location.hash = "";

  if (urlToken.access_token) {
    cookies.set("session_token", urlToken.access_token, { path: "/" });
    console.log("url token: ", urlToken.access_token);
    spotify.setAccessToken(urlToken.access_token);
    console.log(cookies.get("session_token"));
  }

  return (
    <div className="app">
      {urlToken.access_token || sessionToken ? <Player /> : <Login />}
    </div>
  );
}

export default App;
