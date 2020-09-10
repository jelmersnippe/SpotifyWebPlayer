import React from "react";
import Cookies from "universal-cookie";
import "./App.scss";
import { Login, Player } from "./components";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";

function App() {
  // Create a new SpotifyWebApi object so we can access the API functions through the wrapper
  const spotify = new SpotifyWebApi();

  // Create a new Cookies object so we can access the cookie functionality
  const cookies = new Cookies();

  // Set an empty sessionToken and try to get a token from the cookies
  let sessionToken = null;
  if (cookies.get("session_token")) {
    sessionToken = cookies.get("session_token");
    spotify.setAccessToken(sessionToken);
  }

  // Attempt to get a token from the url, and afterwards remove the hash from the url
  const urlToken = getTokenFromUrl();
  window.location.hash = "";

  // If we find a token in the url, set it in the cookies and the SpotifyWebApi wrapper we initiated earlier
  if (urlToken.access_token) {
    cookies.set("session_token", urlToken.access_token, { path: "/" });
    spotify.setAccessToken(urlToken.access_token);
  }

  return (
    // If we have a token load the Player, otherwise load the Login screen
    <div className="app">
      {urlToken.access_token || sessionToken ? <Player /> : <Login />}
    </div>
  );
}

export default App;
