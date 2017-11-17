var myLat = 999;
var myLng = 999;
var myLocation = new google.maps.LatLng(myLat, myLng);
var locations;
var map;
var myOptions = {
    zoom: 15, 
    center: myLocation,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
var request = new XMLHttpRequest();
var peopleMarkers = Array();
var landmarkMarkers = Array();
var landmarkDistances = Array();
var infowindow = new google.maps.InfoWindow();
var closest = 9999;
var landmark;

//sending my location and receiving other locations from server
function init() {
    map = new google.maps.Map(document.getElementById("map"), myOptions);
    if ((myLat == 999) && (myLng == 999)) {
        getMyLocation();
    } 
}

//getting locations from servers
function getLocations(){
    //request.open("POST", "https://find/sendLocation", true);
    request.open("POST", "https://findcomp20students.herokuapp.com/sendLocation", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var rawData = request.responseText;
            locations = JSON.parse(rawData);

            //creating markers for landmarks
            for (var i = 0; i < locations.landmarks.length; i++) {  
                var currentLandmark = {lat: locations.landmarks[i].geometry.coordinates[1],
                    lng: locations.landmarks[i].geometry.coordinates[0]};
                landmarkMarkers[i] = new google.maps.Marker({
                    position: currentLandmark,
                    title: locations.landmarks[i].properties.Location_Name,
                    icon: 'liberty.png'
                });
                landmarkMarkers[i].setMap(map);
                landmarkDistances[i] = distanceBetween(currentLandmark.lat, currentLandmark.lng);
                onClick(landmarkMarkers[i], locations.landmarks[i].properties.Location_Name, currentLandmark.lat, currentLandmark.lng);       
                for (var i = 0; i < landmarkDistances.length; i++) {
                    if (closest > landmarkDistances[i]) {
                        closest = landmarkDistances[i];
                        landmark = locations.landmarks[i];
                    }
                }
            }
            //creating marker for each person
            for (var i = 0; i < locations.people.length; i++) {
             var currPerson = {lat: locations.people[i].lat, lng: locations.people[i].lng};
             peopleMarkers[i] = new google.maps.Marker({
                 position: currPerson,
                 title: locations.people[i]._id + "'s' Location",
                 icon: 'stickman.png'
             });

             peopleMarkers[i].setMap(map);
             onClick(peopleMarkers[i], locations.people[i]._id, locations.people[i].lat, locations.people[i].lng);
         }
     }   
 }
 console.log(myLat + " " + myLng);
 request.send("login=JxwgTxWT&lat=" + myLat + "&lng=" + myLng);
 //request.send();
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
    marker = new google.maps.Marker({
        position: myLocation,
        title: "My Location",
        icon: 'here.png'
    });
    marker.setMap(map);
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent("Login: JxwgTxWT" + ", " + "Closest Landmark: " + landmark.properties.Location_Name + ", " + closest + " miles away");
        infowindow.open(map, marker);
        var flightPlanCoordinates = [{lat: myLat, lng: myLng},
                                     {lat: landmark.geometry.coordinates[1], lng: landmark.geometry.coordinates[0]}];
        var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });
        flightPath.setMap(map);
    });
    map.panTo(myLocation);
}

//when marker is clicked
function onClick(marker, title, lat, lng) {
    var distanceAway = distanceBetween(lat, lng);
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(title + ", " + distanceAway + " miles away");
        infowindow.open(map, marker)
    });
}

//calculates distance between my location and another
function distanceBetween(lat, lng) {
    var conversion = 1609.344;
    var tohere = new google.maps.LatLng(lat, lng);
    meters = google.maps.geometry.spherical.computeDistanceBetween(myLocation, tohere);
    return (meters/conversion);
}