//var Kinetic = require('../libs/kinetic-v5.1.0.min.js');

//is the JSON data from the OpenWeatherMap API
var weather;
//Is the latitude that the user is @
var latitude; 
//Is the longitude that the user is at
var longitude; 

function setup() {
	//If the navigator exists on the user's browser, then it will grab their location. 
	if(navigator.geolocation){
		//finds and watches the user's location
		navigator.geolocation.getCurrentPosition(onPositionRecieved, locationNotRecieved, {timeout:0});
		var watch = navigator.geolocation.watchPosition(onPositionRecieved, locationNotRecieved);
	}
}

function onPositionRecieved(position){

	//when the position is recieved, the latitude and longitude are read and then the JSON is loaded
	latitude = position.coords.latitude; 
	longitude = position.coords.longitude; 

	var urlPreLat = 'http://api.openweathermap.org/data/2.5/weather?lat='; 
   var urlPostLat = '&lon=';
   var urlPostLon = '&APPID=dbbaf2eb6a366eedbd59b8c908bb4cac&units=metric'; 


   var jsonCall = urlPreLat + latitude + urlPostLat + longitude + urlPostLon;
   loadJSON(jsonCall, gotData);
}



//an error is thrown if the location is not recieved
function locationNotRecieved(PositionError){
	console.log(PositionError);
}

function loadJSON(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        success(JSON.parse(xhr.responseText));
      }
      else {
        error(xhr);
      }
    }
  };
  xhr.open('GET', path, true);
  xhr.send();
}


//weather data is saved into the weather var
function gotData(data){

		weather = data; 

//Is the wordset that will be displayed
var words; 

var stage = new Kinetic.Stage({
    container: "container",
    width: window.innerWidth,
    height: window.innerHeight
});

var layer = new Kinetic.Layer();

var displayWidth = window.innerWidth / 4; //sets where the first magnet appears horizontally
var displayHeight = window.innerHeight / 1.5 ; //sets where the first magnet appears vertically


var clearSet = [ '!', '"', '"', '.', '?', 'I', 'I', 'a', 'a', 'am', 'accomplish', 'achieve', 'admire', 'am', 'am', 'an', 'and', 'and', 'any', 'are', 'are', 'be', 'beautiful', 'boy', 'but', 'care', 'chance', 'clear', 'cloud', 'could', 'dance', 'dance', 'darkness', 'day', 'do', 'dream', 'es', 'everything', 'feel', 'for', 'free', 'fresh', 'fun', 'girl', 'grace', 'happy', 'harmony', 'he', 'hello', 'her', 'here', 'hi', 'him', 'how', 'hug', 'imagine', 'is', 'is', 'is', 'is', 'it', 'it', 'joy', 'jubilant', 'jump', 'kiss', 'laugh', 'life', 'light', 'like', 'linger', 'lips', 'love', 'make', 'maybe', 'me', 'me', 'mind', 'my', 'mystery', 'name', 'nap', 'nearby', 'next', 'night', 'no', 'on', 'or', 'peace', 'peaceful', 'possibility', 'possible', 'potential', 'rhythm', 'run', 's', 'safe', 'secure', 'she', 'should', 'simple', 'simply', 'sing', 'sing', 'skip', 'sleep', 'smile', 'so', 'soul', 'spiritual', 'stay', 'sun', 'sunny', 'the', 'the', 'the', 'there', 'think', 'this', 'this', 'thrive', 'through', 'to', 'to', 'today', 'together', 'tomorrow', 'try', 'was', 'was', 'we', 'week', 'were', 'were', 'whisper', 'will', 'will', 'wish', 'with', 'wonder', 'world', 'worthy', 'would', 'would', 'wow', 'wrap', 'year', 'yes', 'yesterday', 'you', 'you', 'your' ]
var rainSet = [ '!', '"', '"', '.', '?', 'I', 'I', 'a', 'a', 'a', 'am', 'am', 'an', 'and', 'and', 'apology', 'april', 'are', 'are', 'away', 'be', 'believe', 'book', 'boy', 'bring', 'but', 'but', 'but', 'can', 'can', 'care', 'chance', 'chance', 'clean', 'cloud', 'clouds', 'cloudy', 'cold', 'come', 'cry', 'damaged', 'dance', 'dark', 'dark', 'darkness', 'day', 'desire', 'drip', 'drop', 'drown', 'es', 'feel', 'flowers', 'for', 'forever', 'get', 'girl', 'give', 'he', 'her', 'him', 'home', 'how', 'in', 'in', 'ing', 'is', 'is', 'is', 'it', 'just', 'kiss', 'last', 'life', 'life', 'light', 'like', 'linger', 'love', 'make', 'may', 'me', 'me', 'melancholy', 'mine', 'my', 'mystery', 'nest', 'never', 'next', 'night', 'no', 'on', 'or', 'pitter-patter', 'pour', 'rain', 'read', 'rhythm', 's', 'safe', 'said', 'serene', 'shall', 'share', 'she', 'shower', 'showers', 'sing', 'singing', 'so', 'sometimes', 'sorrow', 'sorry', 'splash', 'sprinkle', 'stand', 'stay', 'storm', 'sun', 'the', 'the', 'the', 'this', 'through', 'to', 'to', 'to', 'today', 'together', 'tomorrow', 'umbrella', 'under', 'us', 'want', 'was', 'was', 'wash', 'water', 'we', 'were', 'were', 'will', 'will', 'will', 'with', 'worthy', 'would', 'would', 'yes', 'yesterday', 'you', 'you', 'your' ]
var stormSet = [ '!', '.', '?', 'I', 'I', 'a', 'a', 'a', 'a', 'am', 'am', 'an', 'and', 'and', 'any', 'are', 'are', 'be', 'boy', 'but', 'chance', 'cloud', 'could', 'darkness', 'day', 'do', 'everything', 'feel', 'for', 'he', 'her', 'here', 'him', 'how', 'is', 'is', 'is', 'it', 'it', 'like', 'maybe', 'me', 'me', 'my', 'mystery', 'name', 'nap', 'nearby', 'next', 'night', 'no', 'on', 'or', 'she', 'so', 'the', 'the', 'the', 'there', 'think', 'this', 'this', 'thrive', 'through', 'to', 'to', 'today', 'together', 'tomorrow', 'try', 'was', 'was', 'we', 'week', 'were', 'were', 'whisper', 'will', 'will', 'wish', 'with', 'wonder', 'world', 'worthy', 'would', 'would', 'wrap', 'year', 'yes', 'yesterday', 'you', 'you', 'your', 'miss', 'storm', 'turbulent', 'unsettling', 'dark', 'black', 'pitch', 'thunder', 'lightning', 'crowd', 'seek', 'solace', 'serenity', 'chaos', 'peace', 'troubled', 'stormy', 'burden', '"', '"', 'said', 'loud', 'soft', 's', 'es', 'mind', 'demons', 'hurricane', 'tornado', 'spiral', 'anger', 'violent', 'crash', 'fall', 'destroy', 'my', 'life', 'is', 'a', 'mess', 'shambles', 'broken', 'ed', 'break', 'crash', 'rough', 'time', 'this', 'tomorrow', 'will', 'be', 'better', 'eye', 'of', 'calm', 'before' ]
var snowSet = ['!', '.', '?', 'I', 'I', 'a', 'a', 'a', 'a', 'am', 'am', 'an', 'and', 'and', 'any', 'are', 'are', 'be', 'brightness', 'dazzling', 'death', 'he', 'her', 'here', 'him', 'how', 'is', 'is', 'soft', 'milk', 'crisp', 'breath', 'evaporate', 'settle', 'damp', 'love', 'cozy', 'fire', 'whoosh', 'snowman', 'mittens', 'red', 'bitten', 'bright', 'smile', 'glazed', 'stomp', 'heavy', 'tired', 'stoop', 'old', 'wistful', 'stories', 'said', 'fall', 'forever', 'get', 'girl', 'give', 'he', 'her', 'him', 'home', 'how', 'in', 'in', 'ing', 'is', 'is', 'is', 'it', 'just', 'mystery', 'silence', 'night', 'glow', 'orange', 'cheeks', 'fingers', 'lips', 'toes']
var cloudSet = [ '!', '.', '?', 'I', 'I', 'a', 'a', 'a', 'a', 'am', 'am', 'an', 'and', 'and', 'any', 'are', 'are', 'be', 'boy', 'but', 'cloudy', 'cloud', 'gloomy', 'darkness', 'day', 'do', 'everything', 'feel', 'for', 'he', 'her', 'here', 'him', 'how', 'is', 'is', 'is', 'it', 'it', 'like', 'maybe', 'me', 'me', 'my', 'mystery', 'name', 'nap', 'nearby', 'next', 'night', 'no', 'on', 'or', 'she', 'so', 'the', 'the', 'the', 'there', 'think', 'this', 'this', 'thrive', 'through', 'to', 'to', 'today', 'together', 'tomorrow', 'try', 'was', 'was', 'we', 'week', 'were', 'were', 'whisper', 'will', 'will', 'wish', 'with', 'wonder', 'world', 'worthy', 'would', 'would', 'wrap', 'year', 'yes', 'yesterday', 'you', 'you', 'your', 'miss', 'storm', 'turbulent', 'unsettling', 'dark', 'sadness', 'jacket', 'gloomy', 'darkness', 'crowded', 'seek', 'solace', 'serenity', 'chaos', 'peace', 'troubled', 'stormy', 'burden', '"', '"', 'said', 'loud', 'soft', 's', 'es', 'mind', 'demons', 'sleepy', 'tired', 'slope', 'sadness', 'opaque', 'gradual', 'gone', 'destroy' ,'my', 'life', 'is', 'a', 'mess', 'peaceful', 'droopy', 'ed', 'confused', 'blurred', 'sullen', 'vaporous', 'this', 'tomorrow', 'will', 'be', 'better', 'eye', 'of', 'calm', 'before' ]


function magnetGenerator(){

//i being the number of words in a given set
for(i in words) {

    // for each magnet, create a draggable group (text, rectangle)
    var group = new Kinetic.Group({
        draggable: true
    });

    var simpleText = new Kinetic.Text({
        x: displayWidth + 6,
        y: displayHeight,
        text: words[i],
        fontSize: 15,
        fontFamily: 'Times New Roman',
        fill: 'black',     
    });

    var rect = new Kinetic.Rect({
        x: displayWidth + 2,
        y: displayHeight - 4,
        width: simpleText.getWidth() + 8,
        height: simpleText.getHeight() + 8,
        stroke: 'black',
        strokeWidth: 2,
        fill: 'white'
    });
    
    group.add(rect); //add rect first bc otherwise the box goes on top of the text
    group.add(simpleText); //add the text
    layer.add(group); //makes the group draggable
    
    displayWidth = displayWidth + simpleText.getWidth() + 15; //spaces the magnets apart
    if (displayWidth > 7 * window.innerWidth / 8) { //makes the magnets appear in rows
        displayWidth = window.innerWidth / 27;
        displayHeight +=30;
    }
}

stage.add(layer);

}

    //rainy
    var mainWeather = data.weather["0"].main; 

    if(mainWeather== "Mist" || mainWeather == "Drizzle"){
        words = rainSet;
        magnetGenerator(rainSet);
        document.body.style.background = '#9aa0bf';
    }

    if(mainWeather=="Rainy"){
        words = stormSet;
        magnetGenerator(stormSet);
        document.body.style.background = '#171e42';
    }

    //sunny
    if(mainWeather == "Clear"){
        words = clearSet;
        magnetGenerator(clearSet);
        document.body.style.background = '#87CEFA';
    }

    //cloudy weather
    if(mainWeather == "Clouds"){
        words = cloudSet;
        magnetGenerator(cloudSet);
        document.body.style.background = '#ADACA9';
    }

}


