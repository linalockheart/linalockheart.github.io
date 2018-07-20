/////// Stuff I Need ///////

require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var inquirer = require('inquirer');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

/////// Global Variables ///////

var userInput = process.argv
var userCommand = "";

var songName = "";
var movieName = "";

/////// Inquirer ///////

console.log("==============================================");
console.log("Hi, I'm LIRI! (^_^) \nPlease select one of the following commands to get started.")
console.log("==============================================");

inquirer.prompt([
  
    {
      type: "list",
      name: "command",
      message: "Please select a command:",
      choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
    }
  
  ]).then(function(choice) {

    if (choice.command === "my-tweets") {
        getTweets();
    }

    if (choice.command === "spotify-this-song") {
        inquirer.prompt([

            {
              type: "input",
              name: "song",
              message: "Please enter a song name:"
            }
        ]).then(function(songTitle) {
            songName = songTitle.song;
            getSong();
        })
    }

    if (choice.command === "movie-this") {
        inquirer.prompt([

            {
              type: "input",
              name: "movie",
              message: "Please enter a movie title:"
            }
            ]).then(function(movieTitle) {
                movieName = movieTitle.movie;
                getMovie();
            })
    }

    if (choice.command === "do-what-it-says") {
        doWhatItSays();
    }

   });


/////// Twitter Function ///////

function getTweets() {
    var params = {screen_name: 'linalockheart', count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
          for (var i = 0; i < tweets.length; i++) {
              console.log(tweets[i].text);
              console.log(tweets[i].created_at);
              console.log("==============================================");
          }
      }
    });
}

/////// Spotify Function ///////

function getSong() {

    for (var i = 3; i < userInput.length; i++) {
        songName = songName + " " + userInput[i];
      }

    if (songName !== "") {
        spotify.search({ type: 'track', query: songName}, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
            else {
                console.log("Artist: " + data.tracks.items[0].album.artists[0].name); 
                console.log("Song: " + data.tracks.items[0].name);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("Preview: " + data.tracks.items[0].preview_url);
                console.log("==============================================");
            }
    
        })
    }

    else {
        songName = "the sign";

        spotify.search({ type: 'track', query: songName}, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
            else {
                console.log("Artist: " + data.tracks.items[5].album.artists[0].name); 
                console.log("Song: " + data.tracks.items[5].name);
                console.log("Album: " + data.tracks.items[5].album.name);
                console.log("Preview: " + data.tracks.items[5].preview_url);
                console.log("==============================================");
            }
        })

    }
}

/////// OMDB Function ///////

function getMovie() {

    for (var i = 3; i < userInput.length; i++) {
    
      if (i > 3 && i < userInput.length) {
        movieName = movieName + "+" + userInput[i];
      }
    
      else {
        movieName += userInput[i];
      }

    }

    if (movieName !== "") {

        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

        request(queryUrl, function(error, response, body) {

            if (!error && response.statusCode === 200) {
                console.log("Movie Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("==============================================");
            }
        });

    }

    else {

        movieName = "Mr. Nobody";
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

        request(queryUrl, function(error, response, body) {

            if (!error && response.statusCode === 200) {
                console.log("Movie Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("==============================================");
            }
        });

    }
}

/////// Do What It Says Function ///////

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function(err, data) {
      if (err) {
        return console.log(err);
      }
      else {
      data = data.split(",");
      userCommand = data[0];
      songName = data[1];
      getSong();
    }
  })
}
