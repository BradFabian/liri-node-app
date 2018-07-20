require('dotenv').config()
var fs = require('fs');
var keys = require("./keys.js");
//console.log(keys)//
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//stored info vars//
var command = process.argv[2]
var nodeArgv = process.argv;
var x = "";
for (var i=3; i<nodeArgv.length; i++){
  if(i>3 && i<nodeArgv.length){
    x = x + "+" + nodeArgv[i];
  } else{
    x = x + nodeArgv[i];
  }
}
switch(command){
  case "my-tweets":
  showTweets();
  break;

  case "spotify-this-song":
  if(x){
    spotifySong(x);
  } else{
    spotifySong("Fluorescent Adolescent");
  }
  break;

  case "movie-this":
  if(x){
    movieData(x)
  } else{
    movieData("Mr. Nobody")
  }
  break;

  case "do-what-it-says":
  sayWhat();
  break;
  default:
    console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
  break;
}
function showTweets(){
var params = {screen_name: 'CorporateKimono'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {

    for ( var i = 0; i < tweets.length; i++){
      var date = tweets[i].created_at
      console.log("@CorporateKimono Tweet: ", tweets[i].text);
      console.log("Created At: ", date.substring(0,19));
      console.log("------");
    } 
  } else {
    console.log("error:" + err);
    return;
};

  //var tweetResp = JSON.stringify(tweets, null, 2);//
  //console.log(tweetResp)//
 // console.log("Created At: ", tweets[0]['created_at']);//
 // console.log("Tweet: ", tweets[0].text);//
});

}
function spotifySong(song){
  spotify.search({ type: 'track', query: song}, function(error, data){
    if(!error){
      for(var i = 0; i < data.tracks.items.length; i++){
        var songData = data.tracks.items[i];
        //artist
        console.log("Artist: " + songData.artists[0].name);
        //song name
        console.log("Song: " + songData.name);
        //spotify preview link
        console.log("Preview URL: " + songData.preview_url);
        //album name
        console.log("Album: " + songData.album.name);
        console.log("-----------------------");
        
        //adds text to log.txt
      /* fs.appendFile('log.txt', songData.artists[0].name, data, error);
        fs.appendFile('log.txt', songData.name, data, error);
        fs.appendFile('log.txt', songData.preview_url, data,error);
        fs.appendFile('log.txt', songData.album.name, data, error);
        fs.appendFile('log.txt', "-----------------------", data, error);*/
      }
    } else{
      console.log('Error occurred.');
    }
  });
}
function movieData(movie){
  var omdbURL = 'http://www.omdbapi.com/?apikey=trilogy&t=' + movie + '&plot=short&tomatoes=true';

  request(omdbURL, function (error, response, body){
    if(!error && response.statusCode == 200){
      var body = JSON.parse(body);

      console.log("Title: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);
      console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
      console.log("Rotten Tomatoes URL: " + body.tomatoURL);

      //adds text to log.txt
    /*  fs.appendFile('log.txt', "Title: " + body.Title);
      fs.appendFile('log.txt', "Release Year: " + body.Year);
      fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
      fs.appendFile('log.txt', "Country: " + body.Country);
      fs.appendFile('log.txt', "Language: " + body.Language);
      fs.appendFile('log.txt', "Plot: " + body.Plot);
      fs.appendFile('log.txt', "Actors: " + body.Actors);
      fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
      fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL);*/

    } else{
      console.log('Error occurred.')
    }
    if(movie === "Mr. Nobody"){
      console.log("-----------------------");
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!");

      //adds text to log.txt
     /* fs.appendFile('log.txt', "-----------------------");
      fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      fs.appendFile('log.txt', "It's on Netflix!");*/
    }
  });

}
function sayWhat(){
  fs.readFile('random.txt', "utf8", function(error, data){
    var txt = data.split(',');

    spotifySong(txt[1]);
  });
}