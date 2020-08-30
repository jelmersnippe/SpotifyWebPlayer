import React from "react";
import "./SongList.scss";
import { SongItem } from "./SongItem";

function SongList({ playlist }) {
  return (
    <ul className="songlist">
      {/* Spotify has some sort of filtering with tracks you cant play, should implement this because now there are unplayable tracks */}
      {playlist?.tracks?.items?.map((track) => (
        <SongItem
          track={track}
          context_uri={playlist.uri}
          key={track.track.id}
        />
      ))}
    </ul>
  );
}

export default SongList;
