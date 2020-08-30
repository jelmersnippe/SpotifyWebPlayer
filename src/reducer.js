// The playingTrack is already inside the playbackState
// There is no need to track this seperately
export const initialState = {
  user: null,
  playlists: [],
  artists: [],
  albums: [],
  playbackState: {},
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_PLAYBACK_STATE":
      return {
        ...state,
        playbackState: action.playbackState,
      };
    case "SET_ARTISTS":
      return {
        ...state,
        artists: action.artists,
      };
    case "SET_ALBUMS":
      // Add the newly fetched albums to the existing state
      // and filter out any duplicates
      let newAlbums = state.albums.concat(action.albums);
      let filteredAlbums = newAlbums.filter(
        (album, index) => newAlbums.indexOf(album) === index
      );
      return {
        ...state,
        albums: filteredAlbums,
      };
    default:
      return state;
  }
};

export default reducer;
