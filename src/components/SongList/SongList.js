import React from "react";
import "./SongList.scss";
import { SongItem } from "./SongItem";

function SongList({
  tracks,
  context,
  showNumber = false,
  showArt = true,
  showArtistAlbum = true,
}) {
  return (
    <ul className="songlist">
      {tracks?.map((track, index) => {
        if (track && (track.is_playable || track.is_playable === undefined)) {
          return (
            <SongItem
              track={track}
              context_uri={context}
              showNumber={showNumber}
              showArt={showArt}
              showArtistAlbum={showArtistAlbum}
              key={index}
            />
          );
        }
      })}
    </ul>
  );
}

export default SongList;
