var myLat = 999;
var myLng = 999;
var myLocation = new google.maps.LatLng(myLat, myLng);
var locations;
var request = new XMLHttpRequest();

//sending my location and receiving other locations from server
function init() {
    console.log("init");
    if ((myLat == 999) && (myLng == 999)) {
        getMyLocation();
    } else {
        getLocations();
    }
}

function getLocations(){
    request.open("POST", "https://defense-in-derpth.herokuapp.com/sendLocation", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var rawData = request.responseText;
            locations = JSON.parse(rawData);
            //console.log(locations);
            var parameters = "login=JxwgTxWT&lat=" + myLat + "&lng=" + myLng;
            //console.log( "parameters: " + parameters);
        }   
    }
    request.send("login=JxwgTxWT&lat=" + myLat + "&lng=" + myLng);
}

//gets my location
function getMyLocation() {
    console.log("getMyLocation");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            myLat = pos.coords.latitude;
            myLng = pos.coords.longitude;
            //console.log(myLat + " " + myLng);
            getLocations();
        });
    } else {
        alert("Your geolocation cannot be retrieved. Where the heck are you?");
    }
}

//create map
function createMap() {
    me = new google.maps.LatLng(myLat, myLng);
    map = new google.maps.Map(document.getElementById('map'), {
          center: myLocation,
          zoom: 8
        });
}