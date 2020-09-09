// The playingTrack is already inside the playbackState
// There is no need to track this seperately
export const initialState = {
  user: null,
  playlists: [],
  artists: [],
  albums: [],
  playbackState: {},
  searchResults: {},
  searchTerm: "",
};

const reducer = (state, action) => {
  // console.log(action);

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
      let newAlbums = state.albums.concat(action.albums);
      return {
        ...state,
        albums: newAlbums,
      };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.searchResults,
      };
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.searchTerm,
      };

    default:
      return state;
  }
};

export default reducer;
