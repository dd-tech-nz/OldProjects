var APPID = "68592298c1e5daba46ea57d785b7bc76";
var temp;
var humidity;
var icon;
var desc;
var wind;
var direction;
var loc;
var toggle;
var unit;
var convert;
var toggle = 0; // toggel variable 0 = Fahrenheit, 1 = Celsius


//function updateByGeo(lat, lon) {
 //   var url = "https://fcc-weather-api.glitch.me/api/current?" + "lat=" + lat + "&lon=" + lon;
 //   sendRequest(url);
//}



// Create URL to send to API
function updateByCity(city) {
	//alert(city);
    var url = "http://api.openweathermap.org/data/2.5/weather?" + "q=" + city + "&APPID=" + APPID;
	sendRequest(url);
	
}


// Parse AJAX response
function sendRequest(url) {
	
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            
			var data = JSON.parse(xmlhttp.responseText);
            
			var weather = {};
			weather.icon = 'https://cors.5apps.com/?uri=http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
            weather.humidity = data.main.humidity;
            weather.wind = data.wind.speed;
			//weather.direction = data.wind.deg;
            weather.direction = degreesToDirection(data.wind.deg);
			weather.desc = data.weather[0].description;
            weather.loc = data.name;
            // weather.temp = data.main.temp;
            weather.temp = K2F(data.main.temp);
            update(weather);
           
           
            
        } 
    };
    xmlhttp.open("GET", url, false);
    
    xmlhttp.send();
}



//function showPosition(position) {
//    updateByGeo(position.coords.latitude, position.coords.longitude);
//}


// Divides 360 degreess into 16 parts and loops through each angle incrementing by 22.5 until the degee is matched
function degreesToDirection(degrees) {
    var range = 360/16;
    var low = 360 - range/2;
    var high = (low + range) % 360;
    var angles = [ "N", "NNE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    for ( i in angles ) {
        
        if ( degrees >= low && degrees < high) 
            return angles[i];
           
        low = (low + range) % 360;
        high = (high + range) % 360;
    }
    return "N";
}

// formula convert Kelvin to Celsius
function K2C(k) {
    return Math.round(k - 273.15);
}

// Converts Kelvin to Farhrenheit or calls the K2F fuction
function K2F(k) {
    if (toggle == 0) {
    return Math.round(k*(9/5)-459.67);
    } else {
        return K2C(k);
    }
}


// updates page HTML
function update(weather) {
   // wind.innerHTML = weather.wind;
    if (toggle == 0) {
    unit.innerHTML = 'F';
    convert.innerHTML = 'Use Celsius';
    } else { 
        unit.innerHTML = 'C';
        convert.innerHTML = 'Use Fahrenheit';
    }
    
    temp.innerHTML = weather.temp;
    loc.innerHTML = weather.loc;
    wind.innerHTML = weather.wind;
    humidity.innerHTML = weather.humidity;
    direction.innerHTML = weather.direction;
    desc.innerHTML = weather.desc;
    icon.src = weather.icon;
    
    
    
    /* switch statement to see whether the regular expression of the wether decription return a true for key word to load the appropriate image */
    switch(true) {
        case /\brain\b/i.test(weather.desc):
           document.getElementById("weather-view").style.backgroundImage = "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/368633/rainy.jpg')";
           break;
        case /\bclear\b/i.test(weather.desc):
            document.getElementById("weather-view").style.backgroundImage = "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/368633/clear.jpg')";
            break;
        case /\bovercast\b/i.test(weather.desc):
            document.getElementById("weather-view").style.backgroundImage = "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/368633/overcast.jpg')";
            break;
        case /\bclouds\b/i.test(weather.desc): 
            document.getElementById("weather-view").style.backgroundImage = "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/368633/mostly_cloudy.jpg')";
            break;
        case /\bdrizzle\b/i.test(weather.desc): 
            document.getElementById("weather-view").style.backgroundImage = "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/368633/rainy.jpg')";
            break;
        case /\bthunderstorm\b/i.test(weather.desc):
            document.getElementById("weather-view").style.backgroundImage = "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/368633/thunderstorm.jpg')";
            break;
        case /\bsnow\b/i.test(weather.desc):
            document.getElementById("weather-view").style.backgroundImage = "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/368633/snow.jpg')";
            break;
        case /\bmist\b/i.test(weather.desc):
            document.getElementById("weather-view").style.backgroundImage = "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/368633/mist.jpg')";
            break;
        case /\bfog\b/i.test(weather.desc):
            document.getElementById("weather-view").style.backgroundImage = "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/368633/mist.jpg')";
            break;
            
                       }
            
}


window.onload = function () {
   
    temp = document.getElementById("temperature");
    loc = document.getElementById("location");
    icon = document.getElementById("icon");
    humidity = document.getElementById("humidity");
    wind = document.getElementById("wind");
    direction = document.getElementById("direction");
	desc = document.getElementById("description");
    unit = document.getElementById("unit");
    convert = document.getElementById("convert");
    
   
	document.getElementById("submit").onclick = function() {
		var city = document.getElementById("city").value;
         
		 updateByCity(city);
		 
		 } 
    
   
	
	/*  var city = window.prompt("Enter Your City");
      updateByCity(city); */
   document.getElementById("convert").onclick = function () {            
        toggleUnits();  
}

  // if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
   
	 
   }
    

    
  
//if (navigator.geolocation) {
 //   navigator.geolocation.getCurrentPosition(showPosition);
 //   } else {
 //       var unable = window.prompt("Unfortunately we are unable to discover your location.");
 //   }
    
//}


// Function to convert Fahrenheit to Celsius 
function F2C(f) {
    var f2c = Math.round((f - 32) * 5 / 9);
    document.getElementById('convert').innerHTML = 'Use Fahrenheit';
    document.getElementById('unit').innerHTML = "C"
    document.getElementById('temperature').innerHTML = f2c;
    return f2c;
}

// Function to convert Celsius to Fahrenheit
function C2F(c) {
    var c2f = Math.round((c * 9 / 5) + 32);
    document.getElementById('convert').innerHTML = 'Use Celsius';
     document.getElementById('unit').innerHTML = "F"
     document.getElementById('temperature').innerHTML = c2f;
    return c2f;
}


// Toggle temperature
function toggleUnits() {
    if (toggle == 0) {
        toggle = 1;
        F2C(temp.innerHTML); 
		miles2km(wind.innerHTML);
    } else {
        toggle = 0;
        C2F(temp.innerHTML);
		km2miles(wind.innerHTML);
    }
}

function miles2km(miles) {
	var m2k = Math.round( miles * 1.6);
	document.getElementById('wind').innerHTML = m2k;
	document.getElementById('windUnit').innerHTML = " kmph";
	return m2k;
}

function km2miles(km) {
	var k2m = Math.round( km / 1.6);
	document.getElementById('wind').innerHTML = k2m;
	document.getElementById('windUnit').innerHTML = " mph";
	return k2m;
}

/* function toggleUnits() {
     
    if (toggle == 0) {
         toggle = 1;
         var f2c = document.getElementById('temperature').innerHTML;
         f2c = Math.round((f2c - 32) * 5 / 9);
         document.getElementById('convert').innerHTML = 'Use Fahrenheit';
         document.getElementById('unit').innerHTML = "C"
         document.getElementById('temperature').innerHTML = f2c;
     
    
        //document.getElementById('convert').innerHTML = 'Use Celsius';
       // document.getElementById('unit').innerHTML = "F"
       // document.getElementById('temperature').innerHTML = c2f;
     } else { 
         toggle = 0;
         var c2f = document.getElementById('temperature').innerHTML;
         c2f = Math.round((c2f * 9 / 5) + 32);
         document.getElementById('convert').innerHTML = 'Use Celsius';
         document.getElementById('unit').innerHTML = "F"
         document.getElementById('temperature').innerHTML = c2f;
         //alert(c2f);
         
     }
   
 } */

