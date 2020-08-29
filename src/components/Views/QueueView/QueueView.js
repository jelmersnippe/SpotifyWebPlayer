import React from "react";
import "./QueueView.scss";

/* 
  Add functionality for this queue button
  So basically, add a QueueView
  in this view we have to get the current playbackState's context, with the current track as offset
*/

// "NOW PLAYING" Basically spotify hold your current playing song
// "YOUR QUEUE" After that there is your personal queue -> this does not get overwritten
//    This is a seperate object that can be tracked through the API
// "UP NEXT" After that there is the rest of the album/playlist/arist you played -> this gets overwritten
//    This is tracked in the playbackState's context -> it contains a reference to the playlist/artist/album that is being played.
//    This reference can be used to pull the other tracks in the container and add them to the "UP NEXT" list
function QueueView() {
  return (
    <div className="queue view">
      <h2>Queue</h2>
    </div>
  );
}

export default QueueView;
