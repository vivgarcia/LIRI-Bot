require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// Info for Request
var request = require("request");

// Info for Moment -- Date Formatting
var moment = require("moment");

// Info for fs
var fs = require("fs");

// Takes command
var command = process.argv[2];

switch(command){
    case "concert-this": let artist = process.argv[3]
        request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {
            
        if (!error) {
            console.log("-------------------------------------");
            console.log("Venue: " + JSON.parse(body)[0].venue.name);
            console.log("Location: " + JSON.parse(body)[0].venue.city + " " + JSON.parse(body)[0].venue.region);
            console.log("Date: " + moment(JSON.parse(body)[0].datetime).format("MM/DD/YYYY"));
            console.log("-------------------------------------");
            }
    });
    break;
    case "spotify-this-song": let song = process.argv[3]
        if(song === undefined){
            song = "The Sign";
        }
        spotify.search({
            type: "track",
            query: song},
            function(err, data){
                if(err){
                    return console.log("ERROR: " + err)
                }
                console.log("-------------------------------------");
                console.log("Artist: " + data.tracks.items[0].artists.name);
                console.log("Song Name: " + data.tracks.items[0].name);
                console.log("Preview Link: " + data.tracks.items[0].preview_url);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("-------------------------------------");
                })
    break;
    case "movie-this":
        // code goes here
    break;
    case "do-what-it-says":
        // code goes here
}