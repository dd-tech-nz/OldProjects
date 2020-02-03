var temp;
var humidity;
var icon;
var desc;
var wind;
var direction;
var loc;
var toggle = 0;






//if ( cod === '200' ) {
 //  background = document.getElementById("weather-view").style.backgroundImage = "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/368633/mostly_cloudy.jpg')";}



function updateByGeo(lat, lon) {
    var url = "https://fcc-weather-api.glitch.me/api/current?" + "lat=" + lat + "&lon=" + lon;
    sendRequest(url);
}

function sendRequest(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
            var weather = {};
             weather.icon = data.weather[0].icon;
             weather.humidity = data.main.humidity;
             weather.wind = data.wind.speed;
             weather.direction = degreesToDirection(data.wind.deg);
             weather.desc = data.weather[0].description;
             weather.temp = data.main.temp;
             weather.loc = data.name;
             update(weather);
             
            
        }
    };
    
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}



function showPosition(position) {
    updateByGeo(position.coords.latitude, position.coords.longitude);
}




function update(weather) {
   // wind.innerHTML = weather.wind;
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
    icon = document.getElementById("icon");
    cod = document.getElementById("code");
    
 
    
  
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        var unable = window.prompt("Unfortunately we are unable to discover your location.");
    }
    
}

document.getElementById("convert").onclick = function () {            
        toggleUnits();  
}


    
    


 function toggleUnits() {
     
     if (toggle == 0) {
         toggle = 1;
     var c2f = document.getElementById('temperature').innerHTML;
     c2f = Math.round((c2f * 9 / 5) + 32);
    //alert(c2f);
    
        document.getElementById('convert').innerHTML = 'Use Celsius';
        document.getElementById('unit').innerHTML = "F"
        document.getElementById('temperature').innerHTML = c2f;
     } else { 
         toggle = 0;
         var f2c = document.getElementById('temperature').innerHTML;
         f2c = Math.round((f2c - 32) * 5 / 9);
         document.getElementById('convert').innerHTML = 'Use Fahrenheit';
         document.getElementById('unit').innerHTML = "C"
         document.getElementById('temperature').innerHTML = f2c;
         
     }
   
 }

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