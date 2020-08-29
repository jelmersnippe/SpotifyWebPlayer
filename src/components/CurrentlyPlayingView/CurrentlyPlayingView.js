import React from "react";
import "./CurrentlyPlayingView.scss";
import { useDataLayerValue } from "../../DataLayer";
import { TrackControls } from "../../components";

function CurrentlyPlayingView() {
  const [{ playbackState }] = useDataLayerValue();

  return (
    <div className="currently-playing view">
      <h2 className="title">Currently Playing</h2>
      {playbackState && (
        <>
          <img
            className="album-cover"
            src={
              playbackState?.track_window?.current_track?.album?.images?.reduce(
                (initial, image) => {
                  if (!initial.url || image.height > initial.height) {
                    initial = image;
                  }
                  return initial;
                },
                {}
              ).url
            }
            alt=""
          />
          <div className="track-info">
            <h4 className="name">
              {playbackState?.track_window?.current_track?.name}
            </h4>
            <span className="artist">
              {playbackState?.track_window?.current_track?.artists
                .map((artist) => artist.name)
                .reduce((initial, artist) => {
                  if (initial !== "") {
                    initial += ", ";
                  }
                  initial += artist;
                  return initial;
                }, "")}
            </span>
          </div>
        </>
      )}
      <TrackControls />
    </div>
  );
}

export default CurrentlyPlayingView;
