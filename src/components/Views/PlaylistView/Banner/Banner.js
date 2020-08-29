import React from "react";
import "./Banner.scss";

function Banner({ playlist }) {
  return (
    <div className="banner">
      <img className="art" src={playlist.images[0]?.url} alt=""></img>
      <div className="info">
        <h4 className="title">Playlist</h4>
        <h1 className="name">{playlist.name}</h1>
        {playlist.description && (
          <p className="description">{playlist.description}</p>
        )}
        <div className="creator">{playlist.owner.display_name}</div>
      </div>
    </div>
  );
}

export default Banner;
