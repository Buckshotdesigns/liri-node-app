
require("dotenv").config();

var axios = require("axios");

var keys = require("./key.js");

var moment = require("moment");

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret});

var action = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

    if (action === "concert-this") {
        bandsInTown(userInput);

    } if (action === "movie-this" ) {
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
            axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
                function(response) {
                console.log(response.data);
                console.log(response.data.Title);
                console.log(response.data.Year);
                console.log(response.data.imdbRating);
                console.log(response.data.Ratings[1].Value);
                console.log(response.data.Country);
                console.log(response.data.Language);
                console.log(response.data.Plot);
                console.log(response.data.Actors);
                }
             );

        };

        function spotifySong(userInput){
            spotify.search({ type: 'track', query: userInput }, function(err, data) {
                if (err) {
                  return console.log('Error occurred: ' + err);
                }
               
              console.log(data.tracks.items[0].artists[0].name); 
              console.log(data.tracks.items[0].name); 
              console.log(data.tracks.items[0].preview_url); 
              console.log(data.tracks.items[0].album.name); 
              });
        }
