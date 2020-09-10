export const authEndpoint = "https://accounts.spotify.com/authorize";

/*
  Create a redirectUri based on the current base url
  BE AWARE: If this redirectUri is not set in the Spotify Developer Dashboard the Auth will fail
*/
var getUrl = window.location;
const redirectUri =
  getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split("/")[1];

// BE AWARE: Remove this in a production environment
const clientId = "778e93a66af641d4b9e165bc3821ff46";

// Set all the scopes we need for the API calls used in the Player
const scopes = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "user-follow-read",
  "user-library-read",
];

// Construct the Auth url from all the previously assigned variables
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

/*
  Attempt to get a token from the url by:
    Getting everything behind the # sign in the url
    Splitting at every & sign to get all variables in the url
    Split every variable at the = sign and use these parts as the key-value pairs in the object
    Return the object containing all the url variables

    This way we can simply check if the accessToken variable exists inside this object
    and we will know if we have an accessToken in the url
*/
export const getTokenFromUrl = () => {
  let urlToken = window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
  return urlToken;
};
