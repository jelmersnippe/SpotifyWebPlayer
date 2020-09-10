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
      /*     
		The Spotify API only allows fetching 50 items at a time,
		therefor we have to concat the newly fetched albums to the existing state

		TODO:
		Check the state for duplicates
      */
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
