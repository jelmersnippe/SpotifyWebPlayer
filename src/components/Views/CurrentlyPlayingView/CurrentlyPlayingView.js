import React from "react";
import "./CurrentlyPlayingView.scss";
import { useDataLayerValue } from "../../../DataLayer";
import { TrackControls } from "../../../components";

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
              // This is a big view so we get the biggest album image available
              playbackState?.item?.album?.images?.reduce((initial, image) => {
                if (!initial.url || image.height > initial.height) {
                  initial = image;
                }
                return initial;
              }, {}).url
            }
            alt=""
          />
          <div className="track-info">
            <h4 className="name">{playbackState?.item?.name}</h4>
            <span className="artist">
              {/* When there are multiple artists we concatenate them to a single string */}
              {playbackState?.item?.artists
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
