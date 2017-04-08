var keys = require("./keys.js");
var Twitter = require ('twitter');
var client= new Twitter (keys.twitterKeys);
var request = require("request");
var spotify = require('spotify');
var fs = require('fs');
var input = process.argv;
liri (input);
function liri (input) {
var command = input[2];
if (command==="my-tweets") {
	console.log("tweet");
	var params = {screen_name: "ShreksDawg", count: "20"};
	client.get("statuses/user_timeline", params, function(error, tweets, response) {

    for (var ida=0; ida<=19; ida++) {
    console.log(tweets[ida].text + " " + tweets[ida].created_at);
  }
});
}
else if (command==="spotify-this-song") {
	console.log("spotify!");
	var shrek="";
	if(input.length > 3){
		for (var emily=3; emily<input.length; emily++) {
		shrek+= " " + input[emily];
		}
		spotify.search({ type: 'track', query: shrek }, function(err, data) {
    	if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    	}
 	
     
    	console.log(data.tracks.items[0].artists[0].name);
    	console.log(data.tracks.items[0].name);
    	console.log(data.tracks.items[0].preview_url);
    	console.log(data.tracks.items[0].album.name);

		});
	}
	else {
		shrek="the sign"
		spotify.search({ type: 'track', query: shrek }, function(err, data) {
    	if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    	}
 	
     
    	console.log(data.tracks.items[2].artists[0].name);
    	console.log(data.tracks.items[2].name);
    	console.log(data.tracks.items[2].preview_url);
    	console.log(data.tracks.items[2].album.name);

		});

	}
		
	
}
else if (command==="movie-this") {
	console.log("movie!");
	var shrek="";
	if(input.length > 3){
		for (var emily=3; emily<input.length; emily++) {
		shrek+= " " + input[emily];
		}
	}
	else {
		shrek="Mr Nobody"
	}

	request("http://www.omdbapi.com/?t="+shrek+"&y=&plot=short&r=json", function(error, response, body) {

    if (!error && response.statusCode === 200) {

    console.log(JSON.parse(body).Title);
    console.log(JSON.parse(body).Year);
    console.log(JSON.parse(body).imdbRating);
    console.log(JSON.parse(body).Country);
    console.log(JSON.parse(body).Plot);
    console.log(JSON.parse(body).Actors);
    console.log(JSON.parse(body).Ratings[1].Value);
    console.log(JSON.parse(body).Ratings[1].Source);
    //mickeymoused fix this...
    console.log("https://www.rottentomatoes.com/m/" + JSON.parse(body).Title.replace(/ |\. |, |: /g, "_"));
  }
	});
}
else if (command==="do-what-it-says") {
	console.log("random!");
	var dataArr = [];
	fs.readFile('random.txt', "utf8", function(err, data) {
		if(err) {
			console.log(err);
		}
		dataArr=data.split(",");
		console.log(dataArr[1])
		input[2]=dataArr[0];
		input[3]=dataArr[1];
		liri(input);
	});
	
}
else {
	console.log("command not recognized");
}
}