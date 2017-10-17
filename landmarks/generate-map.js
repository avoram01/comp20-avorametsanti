var myLat = 999;
var myLng = 999;
var myLocation = new google.maps.LatLng(myLat, myLng);
var locations;
var map;
var myOptions = {
    zoom: 13, 
    center: myLocation,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
var request = new XMLHttpRequest();
var markers = Array();

//sending my location and receiving other locations from server
function init() {
    map = new google.maps.Map(document.getElementById("map"), myOptions);
    if ((myLat == 999) && (myLng == 999)) {
        getMyLocation();
    } 
}

function getLocations(){
    request.open("POST", "https://defense-in-derpth.herokuapp.com/sendLocation", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var rawData = request.responseText;
            locations = JSON.parse(rawData);
            console.log(locations);
            for (i = 0; i < locations.people.length; i++) {
                var currLocation = {lat: locations.people[i].lat, lng: locations.people[i].lng};
                markers[i] = new google.maps.Marker({
                    position: currLocation,
                    title: locations.people[i]._id + "'s' Location"
                });
                markers[i].setMap(map);
            }
            console.log(markers);
            
            var parameters = "login=JxwgTxWT&lat=" + myLat + "&lng=" + myLng;
            //console.log( "parameters: " + parameters);
        }   
    }
    request.send("login=JxwgTxWT&lat=" + myLat + "&lng=" + myLng);
}

//gets my location
function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            myLat = pos.coords.latitude;
            myLng = pos.coords.longitude;
            myLocation = new google.maps.LatLng(myLat, myLng);
            getLocations();
            createMap();
        });
    } else {
        alert("Your geolocation cannot be retrieved. Where the heck are you?");
    }
}

//create map
function createMap() {
    map.panTo(myLocation);
    marker = new google.maps.Marker({
        position: myLocation,
        title: "Here I Am!"
    });
    marker.setMap(map);
}