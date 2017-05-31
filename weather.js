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
	//the canvas is then created
   createCanvas(500,500);


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

//for now i'm drawing an ellipse to show that the data is reading lmap
function draw() {
	if(weather){
	ellipse(100,100, weather.main.temp, weather.main.temp);

	}
	
}

//an error is thrown if the location is not recieved
function locationNotRecieved(PositionError){
	console.log(PositionError);
}

//weather data is saved into the weather var
function gotData(data){

		weather = data; 
	
	

}