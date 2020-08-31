import React from "react";
import "./PlaylistOverview";
import { useDataLayerValue } from "../../../../DataLayer";
import { PlaylistItem } from "./PlaylistItem";

function PlaylistOverview() {
  const [{ playlists }] = useDataLayerValue();

  return (
    <div className="content playlists">
      {playlists?.items?.map((playlist) => (
        <PlaylistItem playlist={playlist} key={playlist.id} />
      ))}
    </div>
  );
}

export default PlaylistOverview;
