import React from "react";
import "./Login.scss";
import { loginUrl } from "../../../spotify";

function Login() {
  return (
    <div className="login">
      <img
        className="logo"
        src={process.env.PUBLIC_URL + "/spotify_logo_large.png"}
        alt="Spotify"
      />
      <a className="action" href={loginUrl}>
        Login to spotify
      </a>
    </div>
  );
}

export default Login;
