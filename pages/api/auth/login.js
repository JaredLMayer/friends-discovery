
const scopes = [
  'streaming',
  'user-read-playback-state',
  'user-read-email',
  'user-read-private',
  'playlist-read-private',
  'playlist-modify-private',
  'playlist-modify-public',
  'user-library-read',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-top-read',
  'user-read-playback-position',
  'user-follow-read',
  'playlist-read-collaborative'
];

// Pull the values defined in your .env file
const { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } = process.env;

const buildURL = (scopes, callback) => {
  return (
    'https://accounts.spotify.com/authorize?response_type=code' +
    `&client_id=${SPOTIFY_CLIENT_ID}` +
    `&scope=${encodeURIComponent(scopes.join(' '))}` +
    `&redirect_uri=${encodeURIComponent(callback)}`
  );
};

export default async (req, res) => {
  // Redirect all requests to Spotify auth
  return res.redirect(buildURL(scopes, SPOTIFY_REDIRECT_URI));
};

