
// require("dotenv").config();

var axios = require("axios");

var keys = require("./key.js");

// var spotify = require('node-spotify-api');

// var spotify = new Spotify(keys.spotify);

var artist = "slayer";

axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
  function(response) {
    console.log(response.data[0].venue.name);
  }
);











// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }
   
//   console.log(data); 
//   });