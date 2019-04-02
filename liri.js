
require("dotenv").config();

var axios = require("axios");

var keys = require("./key.js");

var moment = require("moment");

var Spotify = require('node-spotify-api');

var fs = require("fs");


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
        fs.readFile("random.txt", "utf8", function(error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
              return console.log(error);
            }
            var dataArr = data.split(",");
        
            if (dataArr[0] === "\nspotify-this-song"){ 
                spotifySong(dataArr[1]);
            }
          
        });
          
    };

        function bandsInTown(bands){
            axios.get("https://rest.bandsintown.com/artists/" + bands + "/events?app_id=codingbootcamp").then(
                function(response) {
                    console.log("\nName of the venue: " + response.data[0].venue.name);
                    console.log("Venue location: " + response.data[0].venue.city);
                    console.log("Date of the event: " + moment(response.data[0].datetime).format("MM-DD-YYYY") + "\n");
                }
            );
        };

        function movieOMDB(movie) {
            if(!movie){
                movie = "Mr. Nobody";
            }
            axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
                function(response) {
                console.log("\nMovie Title: " + response.data.Title);
                console.log("The movie came out in " + response.data.Year);
                console.log("IMDB rated the movie " + response.data.imdbRating);
                console.log("Rotten Tomatoes rated the movie " + response.data.Ratings[1].Value);
                console.log("The movie was porduced in " + response.data.Country);
                console.log("The movie is in " + response.data.Language);
                console.log("Plot of the movie: " + response.data.Plot);
                console.log("Actors in the movie: " + response.data.Actors + "\n");
                }
             );

        };

        function spotifySong(song){
            spotify.search({ type: 'track', query: song }, function(err, data) {
                if (err) {
                  return console.log('Error occurred: ' + err);
                }
                if (!song) {
                    userInput = "The Sign";
                }
               
              console.log("\nArtist or Artists: " + data.tracks.items[0].artists[0].name); 
              console.log("Name of the song: " + data.tracks.items[0].name); 
              console.log("Link to the song on Spotify: " + data.tracks.items[0].preview_url); 
              console.log("Name of the Album: " + data.tracks.items[0].album.name + "\n"); 
              });
        }
