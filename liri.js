require('dotenv').config()
var keys = require("./keys.js");
//console.log(keys)//
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
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
  movie();
  break;

  case "do-what-it-says":
  sayWhat();
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
        fs.appendFile('log.txt', songData.artists[0].name);
        fs.appendFile('log.txt', songData.name);
        fs.appendFile('log.txt', songData.preview_url);
        fs.appendFile('log.txt', songData.album.name);
        fs.appendFile('log.txt', "-----------------------");
      }
    } else{
      console.log('Error occurred.');
    }
  });
}