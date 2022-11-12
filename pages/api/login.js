var client_id = process.env.SPOTIFY_CLIENT_ID;
var redirect_uri = 'http://localhost:3000/api/stats/recently-played';
var querystring = require('querystring');

export default async function handler(req, res) {
  
  var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  
  var state = generateRandomString(16);
  var scope = 'user-library-read user-read-currently-playing user-read-recently-played user-top-read user-read-playback-position user-follow-read playlist-read-collaborative';
  
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
};