import React from "react";
import "./Banner.scss";

function Banner({ artist }) {
  return (
    <div className="banner">
      <img className="art" src={artist.images[0]?.url} alt="" />
      <div className="info">
        <h4 className="title">Artist</h4>
        <h1 className="name">{artist.name}</h1>
      </div>
    </div>
  );
}

export default Banner;
