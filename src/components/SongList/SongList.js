import React from "react";
import "./SongList.scss";
import { SongItem } from "./SongItem";

/* 
We use this SongList in multiple places
With the props we can decide which elements of a track to show
*/
function SongList({
  tracks,
  context,
  showNumber = false,
  showArt = true,
  showArtistAlbum = true,
}) {
  return (
    <ul className="songlist">
      {/* Map all playable tracks to a song item */}
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
