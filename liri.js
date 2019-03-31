
// require("dotenv").config();

var axios = require("axios");

// var keys = require("./key.js");

var moment = require("moment");

// var spotify = require('node-spotify-api');

// var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

    if (action === "concert-this") {
        bandsInTown(userInput);
    } if (action = "movie-this" ) {
        movieOMDB(userInput);
    } if (action === "spotify-this-song") {
        spotifySong(userInput);
    } if (action === "do-what-it-says"){
        console.log("Go get me a large Farva");
    };

        function bandsInTown(userInput){
            axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(
                function(response) {
                    // console.log(response.data);
                    console.log(response.data[0].venue.name);
                    console.log(response.data[0].venue.city);
                    console.log(moment(response.data[0].datetime).format("MM-DD-YYYY"));
                }
            );
        };

        function movieOMDB(userInput) {

        };

        function spotifySong(userInput){
            
        }










// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }
   
//   console.log(data); 
//   });